const express = require('express');
const { check, validationResult } = require('express-validator');
const Course = require('../models/Course');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to verify faculty role
const verifyFaculty = async (req, res, next) => {
  if (!req.user || req.user.role !== 'faculty') {
    return res.status(403).json({ msg: 'Access denied: Faculty only' });
  }
  next();
};

// Middleware to verify student role
const verifyStudent = async (req, res, next) => {
  console.log('User from token:', req.user); // Debugging
  if (!req.user || req.user.role !== 'student') {
    return res.status(403).json({ msg: 'Access denied: Students only' });
  }
  next();
};


// @route   POST /api/courses
// @desc    Add a new course (Faculty only)
// @access  Private
router.post(
  '/courses',
  authMiddleware,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
  ],
  verifyFaculty,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
      const course = new Course({
        title,
        description,
        faculty: req.user.id,
      });
      await course.save();
      res.status(201).json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST /api/courses/:id/register
// @desc    Register for a course (Students only)
// @access  Private
router.post('/courses/:id/register', authMiddleware, /*verifyStudent,*/ async (req, res) => {
  try {
    
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Check if the student is already registered
    if (course.students.includes(req.user._id)) {
      return res.status(400).json({ msg: 'Already registered for this course' });
    }

    // Add student to the course
    course.students.push(req.user._id);
    await course.save();

    res.json({ msg: 'Successfully registered for the course' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('faculty', 'name email');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/courses/:id
// @desc    Get course details
// @access  Public
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('faculty', 'name email');
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/courses/:id/students
// @desc    Get registered students for a course (Faculty only)
// @access  Private
router.get('/courses/:id/students', authMiddleware, verifyFaculty, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students', 'name email');
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json(course.students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
