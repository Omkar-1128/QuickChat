import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(port, () => {
  console.log("Listening on port 8080");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("User connected");
  
  // Store username on the websocket connection
  ws.username = null;
  
  ws.on("error", (e) => {
    console.log("Socket Error: " + e);
  });
  
  ws.on("message", (data) => {
    const message = data.toString();
    
    // Store username from first message and notify others
    if (!ws.username && message.includes(':')) {
      ws.username = message.split(':')[0].trim();
      
      // Notify other users about new connection
      const joinMessage = `SYSTEM:${ws.username} has joined the chat`;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          client.send(joinMessage);
        }
      });
    }

    // broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("User disconnected");
    
    // Notify other users about disconnection
    if (ws.username) {
      const disconnectMessage = `SYSTEM:${ws.username} has left the chat`;
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client !== ws) {
          client.send(disconnectMessage);
        }
      });
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat.html"));
});
