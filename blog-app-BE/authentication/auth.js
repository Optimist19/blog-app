const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../schema-models/user");
const { comparePassword } = require("../hashPassword/hashPassword");

function passportInitializationFtn() {
  passport.serializeUser((user, done) => {
    done(null, user._id.toString());
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            return done(null, false, { message: "No user found" });
          }

          const match = await comparePassword(
            password,
            existingUser.password
          );

          if (!match) {
            return done(null, false, { message: "Incorrect password" });
          }

          return done(null, existingUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

module.exports = passportInitializationFtn;
