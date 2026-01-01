import { randomInt } from "crypto";
import { prisma } from "../config/db.js";
import cron from "node-cron";

const randomDelay = (): Promise<void> => {
  const delay = randomInt(60_000, 3 * 60_000); // 1–3 minutes
//   console.log(`[randomDelay] Started with delay: ${delay} ms`);
  return new Promise(resolve => {
    setTimeout(() => {
    //   console.log(`[randomDelay] Completed after ${delay} ms`);
      resolve();
    }, delay);
  });
};


export function healthCheck(url: string) {
    // console.log('[healthCheck] Initialized and scheduled');
    cron.schedule('*/10 * * * *', async () => {
    // console.log('[healthCheck] Cron job triggered');
    await randomDelay();
        try {
            await prisma.$queryRaw`SELECT 1`;
            await fetch(`${url}/health`);
            console.log('Health check passed:', new Date().toISOString());
        } catch (error) {
            console.error('Health check failed:', error);
        }
    });
}