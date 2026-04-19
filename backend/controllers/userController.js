const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// =====================
// REGISTER USER
// =====================
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length > 0) {
          return res.status(400).json({ message: 'User already exists' });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // insert user
        db.query(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword],
          (err, result) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
              message: 'User registered successfully'
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================
// LOGIN USER
// =====================
exports.login = (req, res) => {
  const { email, password } = req.body;

  try {
    db.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
          return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid password' });
        }

        // create JWT token
        const token = jwt.sign(
          { id: user.id, email: user.email },
          'secretkey', // 👉 later move to .env
          { expiresIn: '1h' }
        );

        res.status(200).json({
          message: 'Login successful',
          token
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
