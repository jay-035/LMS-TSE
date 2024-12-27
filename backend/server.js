const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const cors = require('cors');

const User = require('./models/User');
const Course = require('./models/Course');

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json()); // Middleware to parse JSON
app.use('/api', courseRoutes);
app.use('/api', authRoutes);


// Routes (will be added later)
app.get('/', (req, res) => res.send('API is running...'));

// Database connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error(err));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
