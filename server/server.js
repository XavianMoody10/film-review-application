import express from "express";
import cors from "cors";
import { connectToDatabase } from "./src/lib/mongodb.js";
import { initiateMockServiceWorker } from "./src/mocks/node.js";
import authenticationRouter from "./src/routes/authentication.route.js";
import passport from "passport";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: process.env.NODE_ENV !== "development" ? true : false,
      httpOnly: true,
      sameSite: "lax",
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/authentication", authenticationRouter);

// Server
app.listen(PORT, async () => {
  await connectToDatabase();
  await initiateMockServiceWorker();
  console.log("Server has started on port " + PORT);
});
