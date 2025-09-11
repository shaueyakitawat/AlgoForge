import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import marketRoutes from "./routes/market.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount all market routes
app.use("/api", marketRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
