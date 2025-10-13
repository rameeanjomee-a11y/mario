# Multi-Game Setup Documentation

## Overview
This project now supports multiple games with separate remote controllers using WebSocket rooms.

## Available Games

### 1. **Mario Game**
- **Game URL**: `http://localhost:3000/mario`
- **Controller URL**: `http://localhost:3000/controller`
- **Controls**:
  - D-Pad: Arrow keys (Up, Down, Left, Right)
  - A Button: Jump (W key)
  - B Button: Shoot (Shift key)
  - Start: Pause (P key)

### 2. **Ninja Frogs Game** (2 Players)
- **Game URL**: `http://localhost:3000/frogs`
- **Player 1 Controller**: `http://localhost:3000/controller2` (Green)
  - **D-Pad Layout** (WASD):
    - W (Up/Jump) - Top button
    - A (Left) - Left button  
    - S (Down) - Bottom button
    - D (Right) - Right button
  - **Action Buttons**:
    - Grab: G key (Red button)
    - Use: H key (Yellow button)
- **Player 2 Controller**: `http://localhost:3000/controller3` (Purple)
  - **D-Pad Layout** (Arrow Keys):
    - ↑ (Up/Jump) - Top button
    - ← (Left) - Left button  
    - ↓ (Down) - Bottom button
    - → (Right) - Right button
  - **Action Buttons**:
    - Grab: Ctrl key (Red button)
    - Use: Shift key (Yellow button)

## How It Works

### WebSocket Room System
The server uses a room-based WebSocket system to keep each game isolated:

- **Mario Room**: Connects Mario game with its controller
- **Frogs Room**: Connects Ninja Frogs game with its controller

Each controller sends messages prefixed with the game name (e.g., `mario:jump_down`), and the server routes these to the appropriate game clients.

## Starting the Server

```bash
npm install
npm start
```

The server will start on port 3000 and display:
```
Server running on http://0.0.0.0:3000

Mario Game:
  Controller: http://localhost:3000/controller
  Game: http://localhost:3000/mario

Ninja Frogs Game:
  Controller: http://localhost:3000/controller2
  Game: http://localhost:3000/frogs
```

## Usage

### Single Player (Mario or Ninja Frogs P1)
1. **Start the server**: Run `npm start`
2. **Open a game**: Navigate to `/mario` or `/frogs` on your computer/TV
3. **Open the controller**: On your phone, navigate to `/controller` (Mario) or `/controller2` (Ninja Frogs P1)
4. **Play**: Use the virtual controller to play the game!

### Two Player (Ninja Frogs)
1. **Start the server**: Run `npm start`
2. **Open the game**: Navigate to `/frogs` on your computer/TV
3. **Open controllers**:
   - Player 1: On first phone, navigate to `/controller2` (Green controller)
   - Player 2: On second phone, navigate to `/controller3` (Purple controller)
4. **Play together**: Both players can now control their frogs simultaneously!

## Legacy Support

- `/` redirects to `/controller` (Mario controller)
- `/game` redirects to `/mario` for backward compatibility

## Project Structure

```
mario/
├── server.js                          # Express + WebSocket server
├── controller.html                    # Mario controller
├── controller2.html                   # Ninja Frogs controller
├── games/
│   └── frogs/                        # Ninja Frogs game files
│       ├── ninja_frog_wars.html
│       ├── ninja_frog_wars.js
│       ├── ninja_frog_wars.wasm
│       └── ninja_frog_wars.pck
└── FullScreenMario-master/
    └── Source/                        # Mario game files
        └── index.html
```

## Adding More Games

To add additional games:

1. Create a new directory under `games/` (e.g., `games/newgame/`)
2. Copy your game files there
3. Create a new controller HTML file (e.g., `controller3.html`)
4. Update `server.js`:
   - Add a new room to the `rooms` object
   - Add routes for the game and controller
   - Add registration handlers in the WebSocket message handler
5. Update your game's HTML to connect to the WebSocket with `register:game:newgame`
6. Update your controller to send messages with the game prefix (e.g., `newgame:action`)

## Troubleshooting

### Ninja Frogs controller not responding?

1. **Check WebSocket connection**: Open browser console (F12) on both game and controller pages
   - Controller should show: "Connected to server as frogs controller"
   - Game should show: "Connected to server as frogs game client"
   - When pressing buttons, you should see: "Triggering: [action], keyCode: [code]"

2. **Test keyboard directly**: Try pressing A, W, S, D, G, H keys on your keyboard while the game page is focused
   - If keyboard works but controller doesn't, it's a WebSocket issue
   - If keyboard doesn't work, check if the game loaded properly

3. **Check canvas focus**: Click on the game canvas before trying the controller

4. **Restart**: Refresh both the game and controller pages

### Mario controller not responding?

1. Check WebSocket connections similar to above
2. Click on the game canvas to ensure focus
3. Test with keyboard arrow keys and W/Shift

## Notes

- Each game-controller pair operates independently
- Multiple controllers can connect to the same game
- The WebSocket room system prevents cross-game input interference
- For best results, load the controller on your phone AFTER the game has fully loaded on your TV/computer

