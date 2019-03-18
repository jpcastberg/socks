const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  socks: [{
    id: String,
    brand: String,
    color: String,
    description: String,
    image: String,
    lastWorn: Date,
  }],
  sockHistory: [{
    date: Date,
    left: Object,
    right: Object,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
