# Deployment Guide

## ✅ Pre-Deployment Checklist

All necessary files are now configured for deployment:

### Updated Files
- ✅ `Dockerfile` - Updated to include all game files
- ✅ `package.json` - Updated version to 2.0.0
- ✅ `server.js` - Multi-game support with WebSocket rooms
- ✅ `deploy.sh` - Updated deployment script
- ✅ `.dockerignore` - Already properly configured

### New Files Added
- ✅ `controller2.html` - Ninja Frogs Player 1 controller (Green)
- ✅ `controller3.html` - Ninja Frogs Player 2 controller (Purple)
- ✅ `games/frogs/` - Ninja Frogs game files
- ✅ `MULTI_GAME_SETUP.md` - Documentation
- ✅ `DEPLOYMENT.md` - This file

## 🚀 Deployment Steps

### Option 1: Using deploy.sh script
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual deployment
```bash
# Add all files
git add .

# Commit with a message
git commit -m "Multi-game platform: Mario & Ninja Frogs with remote controllers"

# Push to repository
git push origin main
```

## 📋 What Gets Deployed

The Dockerfile will copy:
- `server.js` - Main server file
- `controller.html` - Mario controller
- `controller2.html` - Ninja Frogs P1 controller
- `controller3.html` - Ninja Frogs P2 controller
- `FullScreenMario-master/` - Mario game files
- `games/` - All additional games (Ninja Frogs)
- `package.json` & `package-lock.json` - Dependencies

## 🌐 Platform-Specific Notes

### Liara (Current Setup)
- Uses `liara.json` for configuration
- Port 3000 is configured
- Will auto-deploy from GitHub

### Railway / Render / Heroku
- Will auto-detect `Dockerfile`
- No additional configuration needed
- Ensure PORT environment variable is supported (already configured)

### Docker Compose (Local/VPS)
```bash
docker-compose up -d
```

## 🔍 Verify Deployment

After deployment, test these URLs (replace with your domain):

### Mario Game
- Controller: `https://your-domain.com/controller`
- Game: `https://your-domain.com/mario`

### Ninja Frogs Game
- Controller P1 (Green): `https://your-domain.com/controller2`
- Controller P2 (Purple): `https://your-domain.com/controller3`
- Game: `https://your-domain.com/frogs`

## ⚠️ Important Notes

1. **WebSocket Support**: Ensure your hosting platform supports WebSocket connections
2. **HTTPS**: Controllers work better with HTTPS (especially on mobile)
3. **Port**: The app uses port 3000 by default (configurable via PORT env variable)
4. **File Size**: Ninja Frogs game is ~64MB, ensure your platform supports larger deployments

## 🐛 Troubleshooting

### If games don't load:
1. Check server logs for any missing files
2. Verify all files were copied in Docker build
3. Check browser console for 404 errors

### If controllers don't connect:
1. Verify WebSocket is working (check browser console)
2. Ensure HTTPS is enabled for production
3. Check firewall/security group settings

### If Player 2 controller doesn't work:
1. Check browser console for keyboard event logs
2. Verify the game canvas has focus
3. Test with keyboard first (Arrow keys + Ctrl/Shift)

## 📝 Environment Variables

Optional environment variables:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (set to 'production' in Dockerfile)

## ✨ Success Criteria

✅ Server starts without errors
✅ All game URLs are accessible
✅ All controller URLs are accessible
✅ WebSocket connections establish successfully
✅ Controllers can control their respective games
✅ Both players can play Ninja Frogs simultaneously

---

**Ready to deploy!** All files are configured and the platform will work on any hosting service that supports Node.js and WebSockets.

