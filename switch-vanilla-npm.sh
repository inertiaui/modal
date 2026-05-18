#!/bin/bash

# Switch @inertiaui/vanilla to npm published version
# Use this before committing/pushing to CI or for release

set -e

cd "$(dirname "$0")"

# Get latest version from npm or use provided version
VERSION=${1:-$(pnpm view @inertiaui/vanilla version)}

echo "Switching to npm vanilla (^$VERSION)..."

# Root devDependencies
sed -i '' "s|\"@inertiaui/vanilla\": \"link:[^\"]*\"|\"@inertiaui/vanilla\": \"^$VERSION\"|" package.json

# vue + react (both occurrences each)
sed -i '' "s|\"@inertiaui/vanilla\": \"link:[^\"]*\"|\"@inertiaui/vanilla\": \"^$VERSION\"|g" vue/package.json
sed -i '' "s|\"@inertiaui/vanilla\": \"link:[^\"]*\"|\"@inertiaui/vanilla\": \"^$VERSION\"|g" react/package.json

echo "Reinstalling workspace dependencies..."
pnpm install

echo "Done! Using npm vanilla@^$VERSION"
