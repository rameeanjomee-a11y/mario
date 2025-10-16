# Multi-Session Parallel Playing Guide

## Overview

The parallel playing feature allows multiple users to play the same game simultaneously without conflict by using unique session IDs. Each session ID creates an isolated "room" where the game and its controllers communicate independently.

## How It Works

### Session ID System
- Each game session is identified by a unique ID (can be any string, e.g., "123", "abc", "player1")
- Sessions are completely isolated - controls from one session won't affect another
- If no ID is provided, the session defaults to "default"

### Room Structure
- Server creates rooms in the format: `<game>:<sessionId>`
- Example: `mario:123` or `frogs:abc`
- Each room has its own game clients and controller clients

## Usage Examples

### Mario Game

#### Session 1 (ID: 123)
1. **Player 1 opens the game on their TV/computer:**
   - URL: `http://domain.com/mario?id=123`

2. **Player 1 opens the controller on their phone:**
   - URL: `http://domain.com/controller?id=123`

#### Session 2 (ID: 124) - Playing at the same time!
1. **Player 2 opens the game on their TV/computer:**
   - URL: `http://domain.com/mario?id=124`

2. **Player 2 opens the controller on their phone:**
   - URL: `http://domain.com/controller?id=124`

**Result:** Both players can play Mario simultaneously without any conflicts!

---

### Ninja Frogs Game

#### Session 1 (ID: abc)
1. **Players open the game:**
   - URL: `http://domain.com/frogs?id=abc`

2. **Player 1 controller (WASD + G/H):**
   - URL: `http://domain.com/controller2?id=abc`

3. **Player 2 controller (Arrow Keys + Ctrl/Shift):**
   - URL: `http://domain.com/controller3?id=abc`

#### Session 2 (ID: xyz) - Playing at the same time!
1. **Different players open the game:**
   - URL: `http://domain.com/frogs?id=xyz`

2. **Player 1 controller:**
   - URL: `http://domain.com/controller2?id=xyz`

3. **Player 2 controller:**
   - URL: `http://domain.com/controller3?id=xyz`

**Result:** Two separate groups can play Ninja Frogs simultaneously!

---

## Controller Reference

### Mario Controller (`/controller`)
- **D-Pad:** Movement (Up, Down, Left, Right)
- **A Button:** Jump
- **B Button:** Shoot/Sprint
- **SELECT:** Select
- **START:** Pause

### Frogs Controller 1 (`/controller2`)
- **D-Pad:** Movement (WASD mapping)
- **GRAB Button:** G key
- **USE Button:** H key

### Frogs Controller 2 (`/controller3`)
- **D-Pad:** Arrow Keys
- **GRAB Button:** Ctrl key
- **USE Button:** Shift key

---

## Technical Details

### Server-Side
- **Room Management:** Automatically creates and deletes rooms as needed
- **Message Format:** `register:game|controller:gameName:sessionId`
- **Action Format:** `gameName:sessionId:action`
- **Cleanup:** Empty rooms are automatically deleted when all clients disconnect

### Client-Side
- **URL Parameters:** Use `?id=<sessionId>` to specify session
- **Default Session:** If no ID provided, uses "default"
- **WebSocket:** All communication uses WebSocket for real-time control

### Backward Compatibility
- Legacy URLs without session IDs still work (use "default" session)
- Old format messages are supported for compatibility

---

## Quick Start

### Local Testing

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Open two Mario sessions in different browser windows:**
   - Window 1 (Game): `http://localhost:3000/mario?id=player1`
   - Window 2 (Controller): `http://localhost:3000/controller?id=player1`
   - Window 3 (Game): `http://localhost:3000/mario?id=player2`
   - Window 4 (Controller): `http://localhost:3000/controller?id=player2`

3. **Test that controls are isolated:**
   - Move in Window 2 (controller for player1) → should only affect Window 1
   - Move in Window 4 (controller for player2) → should only affect Window 3

---

## Best Practices

1. **Use Descriptive Session IDs:**
   - Good: `room-living`, `player-john`, `game-123`
   - Avoid: Generic numbers that might conflict

2. **Share URLs:**
   - Send both game and controller URLs to users
   - Make sure they use the SAME session ID

3. **Session Cleanup:**
   - Rooms are automatically cleaned up when empty
   - No manual cleanup needed

4. **Multiple Controllers:**
   - For Frogs, both controller2 and controller3 use the SAME session ID
   - They control different players in the same game instance

---

## Troubleshooting

### Controller not working
- ✅ Make sure game and controller use the **same session ID**
- ✅ Check browser console for connection logs
- ✅ Verify WebSocket connection is established

### Wrong game responding
- ✅ Double-check the session ID in the URL
- ✅ Each session ID should be unique to avoid conflicts

### Server console logs
- Look for messages like: `Created new room: mario:123`
- Connection logs show: `Controller connected to room mario:123`

---

## Example Deployment Scenarios

### Home Party Setup
- TV displays: `domain.com/frogs?id=party1`
- Guest 1 phone: `domain.com/controller2?id=party1`
- Guest 2 phone: `domain.com/controller3?id=party1`

### Multiple Rooms
- Room A TV: `domain.com/mario?id=roomA`
- Room A Phone: `domain.com/controller?id=roomA`
- Room B TV: `domain.com/mario?id=roomB`
- Room B Phone: `domain.com/controller?id=roomB`

### Tournament Mode
- Match 1: `domain.com/frogs?id=match1`
- Match 2: `domain.com/frogs?id=match2`
- Match 3: `domain.com/frogs?id=match3`
- (All running simultaneously!)

---

## API Reference

### URL Parameters
- **Game URLs:** `/mario?id=<sessionId>` or `/frogs?id=<sessionId>`
- **Controller URLs:** `/controller?id=<sessionId>`, `/controller2?id=<sessionId>`, `/controller3?id=<sessionId>`

### WebSocket Messages

#### Registration
- Game: `register:game:mario:sessionId`
- Controller: `register:controller:mario:sessionId`

#### Actions
- Format: `gameName:sessionId:action`
- Example: `mario:123:jump_down`

---

## Support

For issues or questions:
1. Check server console logs for connection details
2. Verify session IDs match between game and controller
3. Test with simple session IDs first (e.g., "test1", "test2")

Enjoy your multi-session gaming! 🎮🎮🎮


