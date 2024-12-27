const mongoose = require('mongoose');

// Define Course Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Detailed course content
    required: true,
  },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model (faculty)
    required: true,
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model (students)
  }],
}, { timestamps: true });

// Create and export Course model
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
