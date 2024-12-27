const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'faculty'], // Only 'student' or 'faculty' allowed
    required: true,
  },
}, { timestamps: true });

// Create and export User model
const User = mongoose.model('User', userSchema);
module.exports = User;
