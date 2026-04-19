const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================
// LOGIN CONTROLLER
// =====================
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result[0];

      // check password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password" });
      }

      // create JWT token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role   // important for admin
        },
        process.env.JWT_SECRET || "secretkey",
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
  );
};