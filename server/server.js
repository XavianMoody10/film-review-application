import express from "express";
import cors from "cors";
import { startMockServiceWorker } from "./src/mocks/node.js";
import trendingRouter from "./src/routes/trending.route.js";
import mediaRouter from "./src/routes/media.route.js";
import reviewRouter from "./src/routes/reviews.route.js";
import genresRouter from "./src/routes/genres.route.js";
import discoverRouter from "./src/routes/discover.route.js";
import authRouter from "./src/routes/auth.route.js";
import "./src/config/passport.js";

import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 3001;

app.set("trust proxy", 1);

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.LIVE_URL],
    credentials: true,
  }),
);
app.use(express.json());

app.use(
  session({
    name: "Film-review-app-Id", // optional custom cookie name
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // prevents XSS access
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // In production, MUST be true (requires HTTPS)
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/trending", trendingRouter);
app.use("/media", mediaRouter);
app.use("/review", reviewRouter);
app.use("/genres", genresRouter);
app.use("/discover", discoverRouter);
app.use("/auth", authRouter);

app.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database it connected");
  await startMockServiceWorker();

  console.log(`Server has started on port ${PORT}`);
});
