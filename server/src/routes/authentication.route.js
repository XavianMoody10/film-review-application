import { Router } from "express";
import { User } from "../models/user.model.js";
import passport from "../lib/passport/passport.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const data = req.body;

  const { username, email, password } = data;

  try {
    if (!username) {
      throw new Error("Please enter a username");
    }

    if (!email) {
      throw new Error("Please enter a email");
    }

    if (!password) {
      throw new Error("Please enter a password");
    }

    await User.create({ ...data });
    const result = await User.findOne({ email }).select("-password -__v");

    // Log the user in
    req.logIn(result, (err) => {
      if (err) return next(err);

      return res.json(result);
    });

    // return res.json(doc);
  } catch (error) {
    console.log(error.message);
    return res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).send(info.message);

    // Log the user in
    req.logIn(user, (err) => {
      if (err) return next(err);

      return res.json(user);
    });
  })(req, res, next);
});

router.post("/logout", async (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.status(400).json("Logout Error");
    }

    return res.json("Logout Successful");
  });
});

router.get("/isauthenticated", (req, res) => {
  return res
    .status(200)
    .json({ isAuthenticated: req.isAuthenticated(), user: req.user });
});

export default router;
