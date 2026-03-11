import express from "express";
import cors from "cors";
import { connectToDatabase } from "./src/config/mongoose/database.js";
import { startMockServiceWorker } from "./src/mocks/node.js";
import trendingRoute from "./src/routes/trending.route.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/trending", trendingRoute);

// Server
app.listen(PORT, async () => {
  console.log("Server has started on port " + PORT);
  await connectToDatabase();
  await startMockServiceWorker();
});
