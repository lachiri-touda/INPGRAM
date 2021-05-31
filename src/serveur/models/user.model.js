const mongoose = require("mongoose");
//require('mongoose-type-url');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: [20, "Name too long"],
    //minlength: [3, "Fist name too short"]
  },
  username: {
    type: String,
    trim: true,
    required: true,
    maxlength: [20, "User name too long"],
    //minlength: [3, "Fist name too short"]
  },
  url: {
    type: String,
    trim: true,
    default : "https://i.pinimg.com/280x280_RS/b8/49/79/b849797ed8b78c6d2d8ab6db464d61fe.jpg"
   
  },
  bio: {
    type: String,
    trim: true,
    //required: true,
    maxlength: [20, "User name too long"],
    //minlength: [3, "Fist name too short"]
  },
  posts: {
    type: Array,
    default: [],
  },
  website: {
    type: String,
    trim: true,
    //required: true,
    maxlength: [20, "User name too long"],
    //minlength: [3, "Fist name too short"]
  },
  password: {
    type: String,
    required: true,
    //maxlength: [20, "Password too long"],
    //minlength: [6, "Password too short"]
  },
  email: {
    type: String,
    required: true,
    maxlength: [30, "Email exceed the maximum length"],
    //minlength: [6, "Email invalid"]
  },
  followers: {
    type: Array,
    default: [],
  },

  following: {
    type: Array,
    default: [],
  },
});

// virtual fields goes here

// compile and export model from mongoose.Schema
const User = mongoose.model("User", userSchema);
module.exports = User;
