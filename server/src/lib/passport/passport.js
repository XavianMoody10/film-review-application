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
      return done(null, user);
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});

export default passport;
