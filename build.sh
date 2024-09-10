#!/bin/bash
# exit on error
set -o errexit

node -v
npm ci
npm run build
