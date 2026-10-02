#!/bin/bash
sed -i '' 's/^APP_STACK=.*/APP_STACK=react/' "$(dirname "$0")/.env"
echo "Switched to React"
