#!/bin/bash

# Deployment script for Mario Remote Controller

echo "🎮 Deploying Mario Remote Controller..."

# Initialize git if not already
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Add all files
echo "Adding files..."
git add .

# Commit
echo "Committing changes..."
git commit -m "Initial commit: Mario Remote Controller with Docker support"

# Add remote
echo "Adding remote repository..."
git remote add origin git@github.com:rameeanjomee-a11y/mario.git

# Push to main branch
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to your cloud platform (Railway, Render, etc.)"
echo "2. Connect to GitHub repository: rameeanjomee-a11y/mario"
echo "3. The platform will auto-detect the Dockerfile and deploy"
echo ""
echo "Your app will be available at:"
echo "  - Controller: https://your-app-url.com/"
echo "  - Game: https://your-app-url.com/game"


