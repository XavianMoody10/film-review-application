import express from "express";
import cors from "cors";
import { startMockServiceWorker } from "./src/mocks/node.js";
import trendingRouter from "./src/routes/trending.route.js";
import mediaRouter from "./src/routes/media.route.js";
import reviewRouter from "./src/routes/reviews.route.js";
import genresRouter from "./src/routes/genres.route.js";
import discoverRouter from "./src/routes/discover.route.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ["http://localhost:5173", process.env.LIVE_URL] }));
app.use(express.json());

// Routes
app.use("/trending", trendingRouter);
app.use("/media", mediaRouter);
app.use("/review", reviewRouter);
app.use("/genres", genresRouter);
app.use("/discover", discoverRouter);

app.listen(PORT, () => {
  startMockServiceWorker();
  console.log(`Server has started on port ${PORT}`);
});
