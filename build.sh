#!/bin/bash
# exit on error
set -o errexit

node -v
sudo npm install -g n
sudo n latest
sudo n prune
node -v
sudo npm ci
sudo npm run build
