import express from "express";
import cors from "cors";
import { connectToDatabase } from "./src/lib/mongodb.js";
import { initiateMockServiceWorker } from "./src/mocks/node.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Server
app.listen(PORT, async () => {
  await connectToDatabase();
  await initiateMockServiceWorker();
  console.log("Server has started on port " + PORT);
});
