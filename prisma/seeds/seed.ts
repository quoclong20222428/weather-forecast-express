import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as readline from "readline";

const prisma = new PrismaClient();
const BATCH_SIZE = 10000;

// ⚙️ Hàm tạo trigger PostgreSQL tự động cập nhật search_vector
async function setupSearchVectorTrigger() {
  console.log("⚙️ Đang thiết lập trigger tự động cập nhật search_vector...");

  // 1️⃣ Xóa trigger cũ nếu có
  await prisma.$executeRawUnsafe(`
    DROP TRIGGER IF EXISTS location_search_vector_trigger ON "Location";
  `);

  await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS unaccent;`);

  // 2️⃣ Tạo hoặc cập nhật hàm
  await prisma.$executeRawUnsafe(`
    CREATE OR REPLACE FUNCTION update_location_search_vector()
    RETURNS trigger AS $$
    BEGIN
      NEW.search_vector := to_tsvector('simple', unaccent(NEW.display_name));
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // 3️⃣ Tạo trigger
  await prisma.$executeRawUnsafe(`
    CREATE TRIGGER location_search_vector_trigger
    BEFORE INSERT OR UPDATE OF display_name
    ON "Location"
    FOR EACH ROW
    EXECUTE FUNCTION update_location_search_vector();
  `);

  console.log("✅ Trigger search_vector đã được thiết lập.");
}


// ⚙️ Hàm seed dữ liệu NDJSON
async function seedFromNDJSON(filePath: string) {
  const fileStream = fs.createReadStream(filePath, { encoding: "utf-8" });
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let batch: any[] = [];
  let totalInserted = 0;

  console.log("🚀 Bắt đầu import NDJSON vào bảng Location...");

  for await (const line of rl) {
    if (!line.trim()) continue;

    try {
      const obj = JSON.parse(line);

      if (!obj.display_name || !obj.lat || !obj.lon) continue;

      batch.push({
        display_name: obj.display_name,
        country: obj.country || null,
        lat: obj.lat,
        lon: obj.lon,
      });

      if (batch.length >= BATCH_SIZE) {
        await prisma.location.createMany({
          data: batch,
          skipDuplicates: true,
        });
        totalInserted += batch.length;
        console.log(`📦 Đã chèn ${totalInserted.toLocaleString()} bản ghi...`);
        batch = [];
      }
    } catch (err) {
      console.error("❌ Lỗi parse NDJSON:", err);
    }
  }

  if (batch.length > 0) {
    await prisma.location.createMany({
      data: batch,
      skipDuplicates: true,
    });
    totalInserted += batch.length;
  }

  console.log(`✅ Hoàn tất seed! Tổng cộng: ${totalInserted.toLocaleString()} bản ghi.`);
}

async function main() {
  console.time("⏱️ Tổng thời gian seed");

  // Xóa dữ liệu cũ
  console.log("🧹 Xóa dữ liệu cũ trong bảng Location...");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Location" RESTART IDENTITY CASCADE;`);

  // Tạo trigger
  await setupSearchVectorTrigger();

  // Seed dữ liệu NDJSON gồm khoảng 3 637 189 bản ghi
  await seedFromNDJSON("prisma/seeds/seed_location.ndjson");

  console.timeEnd("⏱️ Tổng thời gian seed");
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });