#!/bin/sh
set -e

echo "🚀 Starting application setup..."
echo ""

# Run database migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy
echo "✅ Migrations completed successfully"
echo ""

# Skip seeding in Docker - too large (538MB ndjson file)
# To seed manually: docker exec weather_api node dist/seeds/seed.js
echo "ℹ️  Database seeding skipped (run manually if needed)"
echo "   To seed: docker exec weather_api node dist/seeds/seed.js"
echo ""

echo "✅ Setup complete. Starting server..."
echo ""
exec "$@"
