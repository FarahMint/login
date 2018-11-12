const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const config = require("./database");
const User = require("../models/User");

// // Error: ExtractJwt.fromAuthHeader is not a function https://github.com/bradtraversy/meanauthapp/issues/9
module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload);
      User.getUserById(jwt_payload._id, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};