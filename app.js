const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// cors -> allows up to make request to api from a different domain name
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

//  connnect to mongoose
mongoose.connect(config.database);
//  inform if connected
mongoose.connection.on("connected", () => {
  console.log(`Connected to database ${config.database}`);
});
// msg in case of err
mongoose.connection.on("error", err => {
  console.log(`Database  error${err}`);
});

// init app
const app = express();
//  user  go  in a separate file
const users = require("./routes/users");

//Port Number
const port = 3000;

// Cors middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

// redirect user
app.use("/users", users);

// Index route
app.get("/", (req, res) => {
  res.send("Invalid end point");
});
// * = everything
//every route aside the one specify goes to index file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname), "public/index.html");
});

// Star server
app.listen(port, () => {
  console.log(` server started on ${port}`);
});
