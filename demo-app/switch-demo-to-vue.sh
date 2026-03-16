#!/bin/bash
sed -i '' 's/APP_STACK=react/APP_STACK=vue/' "$(dirname "$0")/.env"
echo "Switched to Vue"
