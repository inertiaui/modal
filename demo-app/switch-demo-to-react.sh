#!/bin/bash
sed -i '' 's/APP_STACK=vue/APP_STACK=react/' "$(dirname "$0")/.env"
echo "Switched to React"
