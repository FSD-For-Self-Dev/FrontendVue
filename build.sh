#!/usr/bin/env bash
# exit on error
set -o errexit

node -v
nvm install 22.4.1
nvm use 22.4.1
node -v
npm ci
npm run build
