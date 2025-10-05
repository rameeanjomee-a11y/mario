// server.js
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use("/game", express.static(path.join(__dirname, "FullScreenMario-master/Source")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "controller.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "FullScreenMario-master/Source/index.html"));
});

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server on the same HTTP server
const wss = new WebSocket.Server({ server });

let gameClients = [];
let controllerClients = [];

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.on("message", (message) => {
    const msg = message.toString();

    if (msg === "register:game") {
      gameClients.push(ws);
      console.log("Game client connected. Total games:", gameClients.length);
    } else if (msg === "register:controller") {
      controllerClients.push(ws);
      console.log("Controller connected. Total controllers:", controllerClients.length);
    } else {
      // Relay controller actions to game clients
      gameClients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(msg);
        }
      });
    }
  });

  ws.on("close", () => {
    gameClients = gameClients.filter(c => c !== ws);
    controllerClients = controllerClients.filter(c => c !== ws);
    console.log("Client disconnected. Games:", gameClients.length, "Controllers:", controllerClients.length);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Controller: http://localhost:${PORT}/`);
  console.log(`Game: http://localhost:${PORT}/game`);
});
