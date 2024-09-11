#!/bin/bash
# exit on error
set -o errexit

node -v
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
sudo nvm install 22.4.1
sudo nvm use 22.4.1
node -v
sudo npm ci
sudo npm run build
