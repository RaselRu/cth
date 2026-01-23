#!/bin/bash

set -e

export NEXT_PUBLIC_BASE_PATH="/cth"
export NEXT_PUBLIC_SITE_URL="https://raselru.github.io/cth"

npm install
npm run build

npx gh-pages -d out --dotfiles

echo "Deployment complete! Your site should be available at https://raselru.github.io/cth"
