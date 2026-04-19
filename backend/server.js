const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');

// Load env
dotenv.config();

console.log("🚀 Starting server...");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =====================
// ROUTES
// =====================
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/cv', require('./routes/cv'));
app.use('/api/profile', require('./routes/profile'))

// =====================
// STATIC FILES (UPLOADS)
// =====================
app.use('/uploads', express.static('uploads'));

// =====================
// TEST ROUTES
// =====================
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is working 🚀' });
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Backend is working correctly 🚀' });
});

// Root
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});