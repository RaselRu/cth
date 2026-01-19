#!/bin/bash

# Install gh-pages if not already installed
npm install gh-pages --save-dev

# Deploy to GitHub Pages
npm run deploy

echo "Deployment complete! Your site should be available at https://raselru.github.io/cth"
