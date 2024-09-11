#!/bin/bash
# exit on error
set -o errexit

node -v
source ~/.nvm/nvm.sh
nvm use 22.4.1
node -v

npm install
npm run build
