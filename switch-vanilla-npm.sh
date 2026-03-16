#!/bin/bash

# Switch @inertiaui/vanilla to npm published version
# Use this before committing/pushing to CI or for release

set -e

cd "$(dirname "$0")"

# Get latest version from npm or use provided version
VERSION=${1:-$(npm view @inertiaui/vanilla version)}

echo "Switching to npm vanilla (^$VERSION)..."

# Update vue/package.json devDependencies only (first occurrence)
sed -i '' "s|\"@inertiaui/vanilla\": \"file:../../vanilla\"|\"@inertiaui/vanilla\": \"^$VERSION\"|" vue/package.json

# Update react/package.json devDependencies only (first occurrence)
sed -i '' "s|\"@inertiaui/vanilla\": \"file:../../vanilla\"|\"@inertiaui/vanilla\": \"^$VERSION\"|" react/package.json

# Reinstall dependencies
echo "Reinstalling vue dependencies..."
cd vue && rm -rf node_modules package-lock.json && npm install
cd ..

echo "Reinstalling react dependencies..."
cd react && rm -rf node_modules package-lock.json && npm install
cd ..

echo "Done! Using npm vanilla@^$VERSION"
