# Deployment Guide

## ✅ Pre-Deployment Checklist

All necessary files are now configured for deployment:

### Updated Files
- ✅ `Dockerfile` - Updated to include all game files and documentation
- ✅ `package.json` - Updated version to 2.0.0
- ✅ `server.js` - Multi-session support with session ID-based rooms
- ✅ `controller.html` - Mario controller with session ID support
- ✅ `controller2.html` - Frogs P1 controller with session ID support
- ✅ `controller3.html` - Frogs P2 controller with session ID support
- ✅ `FullScreenMario-master/Source/index.html` - Mario game with session ID support
- ✅ `games/frogs/ninja_frog_wars.html` - Frogs game with session ID support
- ✅ `deploy.sh` - Updated deployment script
- ✅ `.dockerignore` - Already properly configured

### New Files Added
- ✅ `controller2.html` - Ninja Frogs Player 1 controller (Green)
- ✅ `controller3.html` - Ninja Frogs Player 2 controller (Purple)
- ✅ `games/frogs/` - Ninja Frogs game files
- ✅ `MULTI_GAME_SETUP.md` - Documentation
- ✅ `MULTIPLAYER_SESSIONS.md` - Multi-session parallel playing documentation
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
- `server.js` - Main server file with multi-session support
- `controller.html` - Mario controller with session ID support
- `controller2.html` - Ninja Frogs P1 controller with session ID support
- `controller3.html` - Ninja Frogs P2 controller with session ID support
- `FullScreenMario-master/` - Mario game files with session ID support
- `games/` - All additional games (Ninja Frogs) with session ID support
- `MULTIPLAYER_SESSIONS.md` - Multi-session feature documentation
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

### Mario Game (Legacy - Default Session)
- Controller: `https://your-domain.com/controller`
- Game: `https://your-domain.com/mario`

### Mario Game (Multi-Session Mode)
- Session 1 Game: `https://your-domain.com/mario?id=123`
- Session 1 Controller: `https://your-domain.com/controller?id=123`
- Session 2 Game: `https://your-domain.com/mario?id=124`
- Session 2 Controller: `https://your-domain.com/controller?id=124`

### Ninja Frogs Game (Legacy - Default Session)
- Controller P1 (Green): `https://your-domain.com/controller2`
- Controller P2 (Purple): `https://your-domain.com/controller3`
- Game: `https://your-domain.com/frogs`

### Ninja Frogs Game (Multi-Session Mode)
- Session 1 Game: `https://your-domain.com/frogs?id=abc`
- Session 1 Controller P1: `https://your-domain.com/controller2?id=abc`
- Session 1 Controller P2: `https://your-domain.com/controller3?id=abc`
- Session 2 Game: `https://your-domain.com/frogs?id=xyz`
- Session 2 Controller P1: `https://your-domain.com/controller2?id=xyz`
- Session 2 Controller P2: `https://your-domain.com/controller3?id=xyz`

**See `MULTIPLAYER_SESSIONS.md` for complete documentation on the multi-session feature!**

## ⚠️ Important Notes

1. **WebSocket Support**: Ensure your hosting platform supports WebSocket connections
2. **HTTPS**: Controllers work better with HTTPS (especially on mobile)
3. **Port**: The app uses port 3000 by default (configurable via PORT env variable)
4. **File Size**: Ninja Frogs game is ~64MB, ensure your platform supports larger deployments
5. **Multi-Session Feature**: Multiple users can now play simultaneously using unique session IDs (e.g., `?id=123`)
6. **Session Isolation**: Each session ID creates an isolated room - controls from one session won't affect another
7. **Backward Compatibility**: URLs without session IDs still work (use "default" session)

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

### If multi-session doesn't work (controls affect wrong game):
1. Verify both game and controller use the **same session ID**
2. Check browser console for session ID logs (should show on connection)
3. Check server console for room creation logs (e.g., "Created new room: mario:123")
4. Try using a different, unique session ID to test isolation

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
✅ Multi-session feature works (different session IDs don't interfere)
✅ Session isolation is maintained (controls only affect their own session)
✅ Backward compatibility works (URLs without session IDs use "default" session)

---

**Ready to deploy!** All files are configured and the platform will work on any hosting service that supports Node.js and WebSockets. The new multi-session feature allows unlimited simultaneous games using unique session IDs!

