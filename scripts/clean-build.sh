#!/bin/bash

set -e

echo "Clearing caches..."

rm -rf dist
rm -rf node_modules/.vite
rm -rf node_modules/.cache

find . -name "*.tsbuildinfo" -delete 2>/dev/null || true

echo "Building application..."
pnpm run build

echo "Clean build complete!"