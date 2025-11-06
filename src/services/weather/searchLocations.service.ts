import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface LocationSearchResult {
    id: number;
    display_name: string;
    country: string;
    lat: number;
    lon: number;
    rank?: number; // Điểm xếp hạng độ liên quan (cho full-text search)
}

/**
 * Tìm kiếm địa điểm với PostgreSQL Full-Text Search
 * TỐI ƯU CHO 2 TRIỆU+ RECORDS với GIN index
 * 
 * @param searchTerm - Từ khóa tìm kiếm (ví dụ: "lâm đồng", "hanoi vietnam")
 * @param limit - Số lượng kết quả tối đa trả về
 * @returns Danh sách địa điểm được xếp hạng theo độ liên quan
 */
export async function searchLocationsFullText(
    searchTerm: string,
    limit: number = 8
): Promise<LocationSearchResult[]> {
    // Làm sạch search term (giữ nguyên để hỗ trợ tiếng Việt và tiếng Anh)
    const cleanedTerm = searchTerm.trim();

    if (!cleanedTerm) {
        return [];
    }

    try {
        // Sử dụng plainto_tsquery và ts_rank_cd để tìm kiếm và xếp hạng
        const results = await prisma.$queryRaw<LocationSearchResult[]>`
      SELECT 
        display_name,
        country,
        lat,
        lon,
        ts_rank_cd(search_vector, plainto_tsquery('simple', ${cleanedTerm})) as rank
      FROM "Location"
      WHERE search_vector @@ plainto_tsquery('simple', ${cleanedTerm})
      ORDER BY rank DESC
      LIMIT ${limit}
    `;

        return results;
    } catch (error) {
        console.error("Full-text search error:", error);

        // Fallback: Dùng ILIKE nếu full-text search lỗi
        return fallbackSearch(searchTerm, limit);
    }
}

/**
 * Tìm kiếm PREFIX (cho autocomplete)
 * Dùng khi user đang gõ (ví dụ: "han" → "Hanoi", "Hanam")
 */
export async function searchLocationsByPrefix(
    prefix: string,
    limit: number = 10
): Promise<LocationSearchResult[]> {
    if (!prefix || prefix.length < 2) {
        return [];
    }

    try {
        // Prefix search với ILIKE + index
        const results = await prisma.$queryRaw<LocationSearchResult[]>`
      SELECT 
        id,
        display_name,
        country,
        lat,
        lon
      FROM "Location"
      WHERE display_name ILIKE ${prefix + "%"}
      ORDER BY display_name ASC
      LIMIT ${limit}
    `;

        return results;
    } catch (error) {
        console.error("Prefix search error:", error);
        return [];
    }
}

/**
 * Tìm kiếm HYBRID (kết hợp full-text + prefix)
 * TỐT NHẤT cho UX: Vừa chính xác, vừa linh hoạt
 */
export async function searchLocationsHybrid(
    searchTerm: string,
    limit: number = 20
): Promise<LocationSearchResult[]> {
    const cleanedTerm = searchTerm.trim();

    if (!cleanedTerm || cleanedTerm.length < 2) {
        return [];
    }

    try {
        // Nếu search term ngắn (< 4 ký tự), ưu tiên prefix search
        if (cleanedTerm.length < 4) {
            return searchLocationsByPrefix(cleanedTerm, limit);
        }

        // Nếu search term dài, dùng full-text search với plainto_tsquery
        const results = await prisma.$queryRaw<LocationSearchResult[]>`
      WITH fts_results AS (
        -- Full-text search results với plainto_tsquery và ts_rank_cd
        SELECT 
          id,
          display_name,
          country,
          lat,
          lon,
          ts_rank_cd(search_vector, plainto_tsquery('simple', ${cleanedTerm})) * 2 as rank,
          1 as source
        FROM "Location"
        WHERE search_vector @@ plainto_tsquery('simple', ${cleanedTerm})
      ),
      prefix_results AS (
        -- Prefix search results (lower priority)
        SELECT 
          id,
          display_name,
          country,
          lat,
          lon,
          1.0 as rank,
          2 as source
        FROM "Location"
        WHERE display_name ILIKE ${cleanedTerm + "%"}
        AND id NOT IN (SELECT id FROM fts_results)
      )
      SELECT id, display_name, country, lat, lon, rank FROM (
        SELECT * FROM fts_results
        UNION ALL
        SELECT * FROM prefix_results
      ) combined
      ORDER BY rank DESC
      LIMIT ${limit}
    `;

        return results;
    } catch (error) {
        console.error("Hybrid search error:", error);
        return fallbackSearch(searchTerm, limit);
    }
}

/**
 * Fallback search với ILIKE (khi full-text search lỗi)
 */
async function fallbackSearch(
    searchTerm: string,
    limit: number
): Promise<LocationSearchResult[]> {
    try {
        const results = await prisma.$queryRaw<LocationSearchResult[]>`
            SELECT 
                id,
                display_name,
                country,
                lat,
                lon
            FROM "Location"
            WHERE display_name ILIKE ${'%' + searchTerm + '%'}
            ORDER BY display_name ASC
            LIMIT ${limit}
        `;

        return results;
    } catch (error) {
        console.error("Fallback search error:", error);
        return [];
    }
}

/**
 * Tìm kiếm theo tọa độ (nearby locations)
 * Hữu ích cho "tìm địa điểm gần tôi"
 */
// export async function searchLocationsByCoordinates(
//     lat: number,
//     lon: number,
//     radiusKm: number = 50,
//     limit: number = 20
// ): Promise<LocationSearchResult[]> {
//     try {
//         // Sử dụng haversine formula để tính khoảng cách
//         const results = await prisma.$queryRaw<LocationSearchResult[]>`
//       SELECT
//         id,
//         display_name,
//         country,
//         lat,
//         lon,
//         (
//           6371 * acos(
//             cos(radians(${lat}))
//             * cos(radians(lat))
//             * cos(radians(lon) - radians(${lon}))
//             + sin(radians(${lat}))
//             * sin(radians(lat))
//           )
//         ) as distance_km
//       FROM "Location"
//       WHERE (
//         6371 * acos(
//           cos(radians(${lat}))
//           * cos(radians(lat))
//           * cos(radians(lon) - radians(${lon}))
//           + sin(radians(${lat}))
//           * sin(radians(lat))
//         )
//       ) <= ${radiusKm}
//       ORDER BY distance_km ASC
//       LIMIT ${limit}
//     `;

//         return results;
//     } catch (error) {
//         console.error("Coordinate search error:", error);
//         return [];
//     }
// }
