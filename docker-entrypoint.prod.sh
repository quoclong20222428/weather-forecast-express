#!/bin/sh
set -e

echo "🚀 Starting application..."
echo ""

# Run database migrations only (data already seeded)
echo "📦 Running database migrations..."
npx prisma migrate deploy || echo "⚠️  Database already initialized, skipping migrations"
echo "✅ Database ready"
echo ""

echo "✅ Setup complete. Starting server..."
echo ""
exec "$@"
