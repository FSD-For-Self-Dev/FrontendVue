#!/usr/bin/env bash
# exit on error
set -o errexit

node -v
npm install
npm run build
