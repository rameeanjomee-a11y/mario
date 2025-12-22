# Smash Karts - Remote Controller Setup 🏎️

## Overview
Play Smash Karts on your TV/computer using your phone as a wireless controller!

## What's Been Added

✅ **smashkarts.html** - Game page with iframe embedding Smash Karts  
✅ **controller11.html** - Mobile controller with WASD + Space controls  
✅ **server.js** - Updated with new routes  

## Controller Layout

### D-Pad (Left Side) → WASD Keys
- **W** (Up) - Forward/Accelerate
- **A** (Left) - Turn Left
- **S** (Down) - Backward/Brake
- **D** (Right) - Turn Right

### Action Buttons (Right Side) → Space Key
- **BOOST** - Space
- **ITEM** - Space
- **ACTION** - Space

*Note: All three action buttons trigger the SPACE key as requested*

## How to Test

### 1. Start Your Server

Make sure your server is running on your deployed URL.

### 2. Open Game on TV/Computer

```
https://YOUR-SERVER-URL/smashkarts?id=kart123
```

Replace:
- `YOUR-SERVER-URL` with your actual server
- `kart123` with any unique session ID

### 3. Open Controller on Phone

```
https://YOUR-SERVER-URL/controller11?id=kart123
```

**Important:** Use the SAME session ID (`kart123`) on both URLs!

### 4. Play!

- Controller shows "Connected" with green dot
- Use D-pad to steer (WASD)
- Tap any action button for Space (boost/weapons)
- Rotate phone to landscape mode

## Example URLs

If your server is at `https://myserver.com`:

**Game Display:**
```
https://myserver.com/smashkarts?id=race001
```

**Phone Controller:**
```
https://myserver.com/controller11?id=race001
```

## Features

✨ **Landscape Mode** - Optimized for horizontal phone orientation  
✨ **Haptic Feedback** - Vibration when pressing buttons  
✨ **Fullscreen** - Tap fullscreen button in center  
✨ **Visual Feedback** - Buttons show pressed state  
✨ **Session-Based** - Multiple games can run simultaneously with different IDs  

## Troubleshooting

### Controller shows "Disconnected"
- Check server is running
- Verify WebSocket connection is enabled

### Controls don't work in iframe
- **This is expected!** Web security (CORS) prevents keyboard simulation in cross-origin iframes
- The game iframe from CrazyGames may block external keyboard events
- **Alternative solutions:**
  1. Clone/host Smash Karts locally (if license permits)
  2. Use browser extensions to inject controls
  3. Contact CrazyGames for API access
  4. Choose a self-hosted game instead

### Session IDs don't match
- Ensure both URLs have `?id=SAME_VALUE`
- Session IDs are case-sensitive

## Important Note About iframe Games

The current implementation with CrazyGames iframe has a **limitation**: 

⚠️ **Cross-origin iframes block keyboard event injection** due to browser security policies. This means the controller inputs may not reach the game inside the iframe.

### Recommended Solutions:

1. **Self-host the game** - Download and host Smash Karts locally (if you have rights)
2. **Use a different game** - Try one of your existing games (Mario, Frogs, Streets of Rage)
3. **Build a custom kart game** - Create a simple HTML5 racing game
4. **API Integration** - If CrazyGames provides an API, integrate with it

### Working Example with Self-Hosted Game

If you have a self-hosted racing game, replace the iframe src in `smashkarts.html`:

```html
<!-- Change this -->
<iframe src="https://www.crazygames.com/game/smash-karts">

<!-- To your own game -->
<iframe src="/games/your-racing-game/index.html">
```

## Alternative: Test with Your Other Games

Your other games work perfectly because they're self-hosted:

- **Mario**: `/mario?id=123` + `/controller?id=123`
- **Frogs**: `/frogs?id=124` + `/controller2?id=124`
- **Streets of Rage 2**: `/streetsofrage2?id=125` + `/controller10?id=125`

## Next Steps

1. Test the connection between controller11 and smashkarts page
2. Check browser console for WebSocket messages
3. If iframe blocking occurs, consider self-hosting a racing game
4. Adjust key mappings if needed in controller11.html

## Server Routes Added

```javascript
// Controller
GET /controller11

// Game
GET /smashkarts
```

Both routes support session IDs via `?id=<SESSION_ID>` query parameter.
