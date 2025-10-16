// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use("/mario", express.static(path.join(__dirname, "FullScreenMario-master/Source")));
app.use("/frogs", express.static(path.join(__dirname, "games/frogs")));

// Routes for controllers
app.get("/controller", (req, res) => {
  res.sendFile(path.join(__dirname, "controller.html"));
});

app.get("/controller2", (req, res) => {
  res.sendFile(path.join(__dirname, "controller2.html"));
});

app.get("/controller3", (req, res) => {
  res.sendFile(path.join(__dirname, "controller3.html"));
});

// Routes for games
app.get("/mario", (req, res) => {
  res.sendFile(path.join(__dirname, "FullScreenMario-master/Source/index.html"));
});

app.get("/frogs", (req, res) => {
  res.sendFile(path.join(__dirname, "games/frogs/ninja_frog_wars.html"));
});

// Redirect old routes for backward compatibility
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "controller.html"));
});

app.get("/game", (req, res) => {
  res.redirect("/mario");
});

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server on the same HTTP server
const wss = new WebSocket.Server({ server });

// Room-based client storage with session IDs
// Structure: rooms["mario:123"] = { gameClients: [], controllerClients: [] }
const rooms = {};

// Helper function to get or create a room
function getRoom(roomId) {
  if (!rooms[roomId]) {
    rooms[roomId] = {
      gameClients: [],
      controllerClients: []
    };
    console.log(`Created new room: ${roomId}`);
  }
  return rooms[roomId];
}

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.on("message", (message) => {
    const msg = message.toString();

    // Register game or controller with format: "register:game|controller:gameName:sessionId"
    if (msg.startsWith("register:")) {
      const parts = msg.split(":");
      if (parts.length >= 4) {
        // New format with session ID: register:game:mario:123
        const action = parts[1]; // "game" or "controller"
        const gameName = parts[2]; // "mario" or "frogs"
        const sessionId = parts[3]; // "123"
        const roomId = `${gameName}:${sessionId}`;
        
        const room = getRoom(roomId);
        ws.roomId = roomId;
        ws.clientType = action;
        
        if (action === "game") {
          room.gameClients.push(ws);
          console.log(`Game client connected to room ${roomId}. Total game clients: ${room.gameClients.length}`);
        } else if (action === "controller") {
          room.controllerClients.push(ws);
          console.log(`Controller connected to room ${roomId}. Total controllers: ${room.controllerClients.length}`);
        }
      } else if (parts.length === 3) {
        // Legacy format without session ID: register:game:mario (use "default" as session ID)
        const action = parts[1]; // "game" or "controller"
        const gameName = parts[2]; // "mario" or "frogs"
        const sessionId = "default";
        const roomId = `${gameName}:${sessionId}`;
        
        const room = getRoom(roomId);
        ws.roomId = roomId;
        ws.clientType = action;
        
        if (action === "game") {
          room.gameClients.push(ws);
          console.log(`[Legacy] Game client connected to room ${roomId}. Total game clients: ${room.gameClients.length}`);
        } else if (action === "controller") {
          room.controllerClients.push(ws);
          console.log(`[Legacy] Controller connected to room ${roomId}. Total controllers: ${room.controllerClients.length}`);
        }
      }
      return;
    }

    // Handle controller inputs with format: "gameName:sessionId:action"
    if (msg.includes(":")) {
      const firstColon = msg.indexOf(":");
      const secondColon = msg.indexOf(":", firstColon + 1);
      
      if (secondColon > -1) {
        // New format with session ID: "mario:123:jump_down"
        const gameName = msg.substring(0, firstColon);
        const sessionId = msg.substring(firstColon + 1, secondColon);
        const action = msg.substring(secondColon + 1);
        const roomId = `${gameName}:${sessionId}`;
        
        const room = rooms[roomId];
        if (room) {
          room.gameClients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(action);
            }
          });
        }
      } else {
        // Legacy format: "mario:jump_down" (use "default" as session ID)
        const gameName = msg.substring(0, firstColon);
        const action = msg.substring(firstColon + 1);
        const roomId = `${gameName}:default`;
        
        const room = rooms[roomId];
        if (room) {
          room.gameClients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(action);
            }
          });
        }
      }
      return;
    }

    // Fallback for messages without any format (legacy support)
    const defaultRoomId = "mario:default";
    const room = rooms[defaultRoomId];
    if (room) {
      room.gameClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    }
  });

  ws.on("close", () => {
    // Remove from appropriate room
    if (ws.roomId && ws.clientType) {
      const room = rooms[ws.roomId];
      if (room) {
        if (ws.clientType === "game") {
          room.gameClients = room.gameClients.filter(c => c !== ws);
          console.log(`Game client disconnected from room ${ws.roomId}. Remaining: ${room.gameClients.length}`);
        } else if (ws.clientType === "controller") {
          room.controllerClients = room.controllerClients.filter(c => c !== ws);
          console.log(`Controller disconnected from room ${ws.roomId}. Remaining: ${room.controllerClients.length}`);
        }
        
        // Clean up empty rooms
        if (room.gameClients.length === 0 && room.controllerClients.length === 0) {
          delete rooms[ws.roomId];
          console.log(`Room ${ws.roomId} deleted (empty)`);
        }
      }
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`\n🎮 Multi-Session Gaming Server`);
  console.log(`\nMario Game with Session IDs:`);
  console.log(`  Controller: http://localhost:${PORT}/controller?id=<SESSION_ID>`);
  console.log(`  Game: http://localhost:${PORT}/mario?id=<SESSION_ID>`);
  console.log(`  Example: http://localhost:${PORT}/mario?id=123`);
  console.log(`           http://localhost:${PORT}/controller?id=123`);
  console.log(`\nNinja Frogs Game with Session IDs:`);
  console.log(`  Controller P1: http://localhost:${PORT}/controller2?id=<SESSION_ID>`);
  console.log(`  Controller P2: http://localhost:${PORT}/controller3?id=<SESSION_ID>`);
  console.log(`  Game: http://localhost:${PORT}/frogs?id=<SESSION_ID>`);
  console.log(`  Example: http://localhost:${PORT}/frogs?id=124`);
  console.log(`           http://localhost:${PORT}/controller2?id=124`);
  console.log(`\n💡 Each session ID creates an isolated game room!`);
});
