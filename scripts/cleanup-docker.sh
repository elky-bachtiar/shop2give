#!/bin/bash

echo "🚀 Starting Docker cleanup..."

# Stop all running containers
echo "🛑 Stopping all running containers..."
docker stop $(docker ps -aq) 2>/dev/null

# Remove all stopped containers
echo "🗑️  Removing all stopped containers..."
docker rm $(docker ps -aq) 2>/dev/null

# Remove unused networks
echo "🌐 Removing unused networks..."
docker network prune -f

# Remove unused images
#echo "🖼️  Removing unused images..."
#docker image prune -af

# Remove build cache
echo "🧹 Cleaning up build cache..."
docker builder prune -af

# Remove build history
echo "📚 Removing build history..."
docker builder prune -af

# Clean up JavaScript files generated from TypeScript
echo "🧹 Cleaning up generated JavaScript files..."
find /Users/in615bac/Documents/givio/shop2give/supabase/functions -name "*.js" -not -path "*/node_modules/*" -exec rm -f {} \;

# Clean up any log files
find /Users/in615bac/Documents/givio/shop2give -name "*.log" -exec rm -f {} \;

echo "✨ Docker cleanup complete!"