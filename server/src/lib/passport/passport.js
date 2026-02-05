import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "../../models/user.model.js";

passport.use(
  new LocalStrategy.Strategy(
    { usernameField: "email", passwordField: "password" },
    async function (username, password, done) {
      const user = await User.findOne({ email: username });
      if (!user) return done(null, false, { message: "Incorrect username." });
      if (user.password !== password)
        return done(null, false, { message: "Incorrect password." });
      const result = await User.findOne({ email: username }).select(
        "-password -__v",
      );
      return done(null, result);
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).select("-password -__v");
  done(null, user);
});

export default passport;
