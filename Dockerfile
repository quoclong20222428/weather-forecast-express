# --- Giai đoạn 1: Build TypeScript ---
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Giai đoạn 2: Run Production ---
FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
COPY .env .env

EXPOSE 5001

# Generate Prisma client trong container
RUN npx prisma generate

CMD ["node", "dist/server.js"]
