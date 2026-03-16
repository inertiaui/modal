#!/bin/bash

# Switch @inertiaui/vanilla to local development version (file:../../vanilla)
# Use this for local development when working on vanilla alongside modal

set -e

cd "$(dirname "$0")"

echo "Switching to local vanilla (file:../../vanilla)..."

# Update vue/package.json
sed -i '' 's|"@inertiaui/vanilla": "[^"]*"|"@inertiaui/vanilla": "file:../../vanilla"|' vue/package.json

# Update react/package.json
sed -i '' 's|"@inertiaui/vanilla": "[^"]*"|"@inertiaui/vanilla": "file:../../vanilla"|' react/package.json

# Reinstall dependencies
echo "Reinstalling vue dependencies..."
cd vue && rm -rf node_modules package-lock.json && npm install
cd ..

echo "Reinstalling react dependencies..."
cd react && rm -rf node_modules package-lock.json && npm install
cd ..

echo "Done! Using local vanilla from ../../vanilla"
