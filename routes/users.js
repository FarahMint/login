const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/User");

// Register
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: " failed to register user" });
    } else {
      res.json({ success: true, msg: " User registered successfully" });
    }
  });
});

// Authenticate
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // get user by username
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        //on Error: Expected "payload" to be a plain object use toJSON()
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week in sec
        });
        //  response to front end
        res.json({
          success: true,
          token: `JWT ${token}`,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        // if no match
        return res.json({ success: false, msg: "wrong password" });
      }
    });
  });
});

// Profile -protect with authification with token
router.get(
  "/profile",
  //protect route
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    // res.send("profile");
    res.json({ user: req.user });
  }
);

//  need to export the router
module.exports = router;
