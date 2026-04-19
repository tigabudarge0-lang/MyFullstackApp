const express = require("express")
const router = express.Router()
const db = require("../config/db")

// GET PROFILE
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id=?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result[0])
  })
})

// UPDATE PROFILE
router.put("/:id", (req, res) => {
  const { name, email, bio } = req.body

  db.query(
    "UPDATE users SET name=?, email=?, bio=? WHERE id=?",
    [name, email, bio, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ message: "Profile updated" })
    }
  )
})

module.exports = router