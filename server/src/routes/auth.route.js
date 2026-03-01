import { Router } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { User } from "../models/user.model.js";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    const newUser = await User.findOne({ email }).select("-__v -password");

    // Manually log the user in
    req.login(newUser, async (err) => {
      if (err) {
        console.log(err);

        return res.status(404).json({
          message: "Error logging in after register",
        });
      }

      return res.json({
        message: "User registered successfully",
        user: newUser,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || "Login failed",
      });
    }

    // Manually log the user in
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({
        message: "Logged in successfully",
        user,
      });
    });
  })(req, res, next); // Important: invoke the middleware
});

// Logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Logged out successfully" });
  });
});

// Check session
router.get("/session", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ isAuthenticated: req.isAuthenticated(), user: req.user });
  } else {
    return res.json({ isAuthenticated: req.isAuthenticated() });
  }
});

export default router;
