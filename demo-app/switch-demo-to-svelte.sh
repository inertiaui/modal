#!/bin/bash
sed -i '' 's/^APP_STACK=.*/APP_STACK=svelte/' "$(dirname "$0")/.env"
echo "Switched to Svelte"
