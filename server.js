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

// Separate client lists for each game room
const rooms = {
  mario: {
    gameClients: [],
    controllerClients: []
  },
  frogs: {
    gameClients: [],
    controllerClients: []
  }
};

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.on("message", (message) => {
    const msg = message.toString();

    // Register mario game
    if (msg === "register:game:mario") {
      rooms.mario.gameClients.push(ws);
      ws.room = "mario";
      ws.clientType = "game";
      console.log("Mario game client connected. Total:", rooms.mario.gameClients.length);
    } 
    // Register mario controller
    else if (msg === "register:controller:mario") {
      rooms.mario.controllerClients.push(ws);
      ws.room = "mario";
      ws.clientType = "controller";
      console.log("Mario controller connected. Total:", rooms.mario.controllerClients.length);
    }
    // Register frogs game
    else if (msg === "register:game:frogs") {
      rooms.frogs.gameClients.push(ws);
      ws.room = "frogs";
      ws.clientType = "game";
      console.log("Frogs game client connected. Total:", rooms.frogs.gameClients.length);
    }
    // Register frogs controller
    else if (msg === "register:controller:frogs") {
      rooms.frogs.controllerClients.push(ws);
      ws.room = "frogs";
      ws.clientType = "controller";
      console.log("Frogs controller connected. Total:", rooms.frogs.controllerClients.length);
    }
    // Handle mario controller inputs
    else if (msg.startsWith("mario:")) {
      const action = msg.substring(6); // Remove "mario:" prefix
      rooms.mario.gameClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(action);
        }
      });
    }
    // Handle frogs controller inputs
    else if (msg.startsWith("frogs:")) {
      const action = msg.substring(6); // Remove "frogs:" prefix
      rooms.frogs.gameClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(action);
        }
      });
    }
    // Legacy support for old mario controller (no prefix)
    else {
      rooms.mario.gameClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    }
  });

  ws.on("close", () => {
    // Remove from appropriate room
    if (ws.room && ws.clientType) {
      if (ws.clientType === "game") {
        rooms[ws.room].gameClients = rooms[ws.room].gameClients.filter(c => c !== ws);
      } else if (ws.clientType === "controller") {
        rooms[ws.room].controllerClients = rooms[ws.room].controllerClients.filter(c => c !== ws);
      }
      console.log(`${ws.room} ${ws.clientType} disconnected.`);
    }
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`\nMario Game:`);
  console.log(`  Controller: http://localhost:${PORT}/controller`);
  console.log(`  Game: http://localhost:${PORT}/mario`);
  console.log(`\nNinja Frogs Game:`);
  console.log(`  Controller P1: http://localhost:${PORT}/controller2`);
  console.log(`  Controller P2: http://localhost:${PORT}/controller3`);
  console.log(`  Game: http://localhost:${PORT}/frogs`);
});
