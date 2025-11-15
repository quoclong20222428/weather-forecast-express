import { prisma } from "../../config/db.js";
import { CACHE_TTL } from "./utils.js";
import { getFromCache, setToCache, setEmptyCache, CACHE_EMPTY_MARKER } from "../../utils/cacheHelper.js";

interface City {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

export const getSavedCities = async (userId: string): Promise<City[]> => {
  const cacheKey = `cities:saved:${userId}`;

  // 1. Kiểm tra cache trước (chống cache avalanche với TTL jitter)
  const cachedCities = await getFromCache<City[]>(cacheKey);
  
  if (cachedCities === CACHE_EMPTY_MARKER) {
    // Cache empty marker - user không có city nào
    // console.log(`🔴 User ${userId} has no saved cities (from cache)`);
    return [];
  }
  
  if (cachedCities !== null && cachedCities !== CACHE_EMPTY_MARKER) {
    // Cache hit - trả về data từ cache
    return cachedCities as City[];
  }

  // console.log(`❌ Cache MISS: ${cacheKey}`);

  // 2. Query database
  const userCities = await prisma.userCity.findMany({
    where: {
      userId: userId
    },
    include: {
      city: true
    },
    orderBy: {
      savedAt: "desc"
    }
  });
  
  const cityList = userCities.map(uc => uc.city);

  // 3. Cache kết quả (chống cache penetration)
  if (cityList.length === 0) {
    // Nếu user không có city nào, cache empty marker với TTL dài
    await setEmptyCache(cacheKey, CACHE_TTL);
  } else {
    // Cache danh sách cities với TTL có jitter (chống avalanche)
    await setToCache(cacheKey, cityList, CACHE_TTL);
  }

  return cityList;
};
