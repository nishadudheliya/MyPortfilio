// Import
let mongoose = require('mongoose');

// Create a model class
let userModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      contact_number: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
    },
);

const User = mongoose.model("User", userModel );

module.exports = User;