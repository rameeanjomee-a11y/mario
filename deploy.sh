#!/bin/bash

# Deployment script for Multi-Game Remote Controller Platform

echo "🎮 Deploying Multi-Game Remote Controller Platform..."

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
git commit -m "Multi-game platform: Mario & Ninja Frogs with remote controllers"

# Add remote (update if needed)
# Uncomment and update if remote doesn't exist
# echo "Adding remote repository..."
# git remote add origin git@github.com:rameeanjomee-a11y/mario.git

# Push to main branch
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to your cloud platform (Railway, Render, Liara, etc.)"
echo "2. Connect to GitHub repository: rameeanjomee-a11y/mario"
echo "3. The platform will auto-detect the Dockerfile and deploy"
echo ""
echo "Your app will be available at:"
echo "🎮 Mario Game:"
echo "  - Controller: https://your-app-url.com/controller"
echo "  - Game: https://your-app-url.com/mario"
echo ""
echo "🐸 Ninja Frogs Game (2 Players):"
echo "  - Controller P1: https://your-app-url.com/controller2"
echo "  - Controller P2: https://your-app-url.com/controller3"
echo "  - Game: https://your-app-url.com/frogs"


