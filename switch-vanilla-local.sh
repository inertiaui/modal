#!/bin/bash

# Switch @inertiaui/vanilla to local development version (link:../vanilla)
# Use this for local development when working on vanilla alongside modal

set -e

cd "$(dirname "$0")"

echo "Switching to local vanilla (link:../vanilla)..."

# Root devDependencies
sed -i '' 's|"@inertiaui/vanilla": "[^"]*"|"@inertiaui/vanilla": "link:../vanilla"|' package.json

# vue + react package.json (both occurrences in each — devDeps and deps)
sed -i '' 's|"@inertiaui/vanilla": "[^"]*"|"@inertiaui/vanilla": "link:../../vanilla"|g' vue/package.json
sed -i '' 's|"@inertiaui/vanilla": "[^"]*"|"@inertiaui/vanilla": "link:../../vanilla"|g' react/package.json

echo "Reinstalling workspace dependencies..."
pnpm install

echo "Done! Using local vanilla from ../vanilla"
