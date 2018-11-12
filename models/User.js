const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");

//  User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

// function to get user by ID
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};
//function to get user by Name
module.exports.getUserByUsername = function(username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

//function to add user
module.exports.addUser = function(newUser, callback) {
  //  generate random key to hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      //
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

//  compare pwd
module.exports.comparePassword = function(userPassword, hash, callback) {
  bcrypt.compare(userPassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};
