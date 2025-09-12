import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import axios from "axios";

dotenv.config();

// --- Configuration ---
const PORT = process.env.PORT || 5000;
const PYTHON_SERVICE_URL = "http://localhost:5001/api-market"; // ✅ match app.py
const FETCH_INTERVAL_MS = 15 * 1000; // Fetch fresh data every 15 seconds

// --- Express App Setup ---
const app = express();
app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Market WebSocket + REST hybrid server is active.");
});

// Hybrid REST fallback: serve latest cached market data
app.get("/api/market", (req, res) => {
  if (Object.keys(latestData).length > 0) {
    res.json(latestData);
  } else {
    res.status(503).json({ error: "No market data available yet." });
  }
});

// --- HTTP and WebSocket Server Integration ---
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let latestData = {}; // In-memory cache for market data

// --- WebSocket Logic ---
wss.on("connection", (ws) => {
  console.log("✅ Frontend client connected via WebSocket");

  // Send cached data immediately
  if (Object.keys(latestData).length > 0) {
    ws.send(JSON.stringify(latestData));
  }

  ws.on("close", () => {
    console.log("❌ Frontend client disconnected");
  });

  ws.on("error", (error) => {
    console.error("A WebSocket error occurred:", error);
  });
});

// --- Fetch + Broadcast Logic ---
const fetchDataAndBroadcast = async () => {
  console.log("📡 Server fetching data from Python service...");
  try {
    const response = await axios.get(PYTHON_SERVICE_URL);
    latestData = response.data;

    if (wss.clients.size > 0) {
      console.log(
        `📢 Broadcasting new data to ${wss.clients.size} connected client(s).`
      );
      const dataString = JSON.stringify(latestData);
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(dataString);
        }
      });
    }
  } catch (error) {
    console.error("❌ Error fetching/broadcasting market data:", error.message);
  }
};

// --- Start the System ---
fetchDataAndBroadcast();
setInterval(fetchDataAndBroadcast, FETCH_INTERVAL_MS);

server.listen(PORT, () => {
  console.log(
    `🚀 Server with WebSocket + REST hybrid support is running on http://localhost:${PORT}`
  );
});
