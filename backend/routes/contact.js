const express = require('express')
const router = express.Router()
const db = require('../config/db')

// GET all messages
router.get('/', (req, res) => {
  db.query('SELECT * FROM contact', (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

// SEND message
router.post('/', (req, res) => {
  const { name, email, message } = req.body

  db.query(
    'INSERT INTO contact (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    (err) => {
      if (err) return res.status(500).json(err)
      res.json({ message: 'Message sent successfully' })
    }
  )
})

module.exports = router