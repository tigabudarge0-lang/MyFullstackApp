const express = require('express')
const router = express.Router()
const db = require('../config/db')

// =====================
// GET ALL SKILLS
// =====================
router.get('/', (req, res) => {
  db.query('SELECT * FROM skills', (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

// =====================
// CREATE SKILL
// =====================
router.post('/', (req, res) => {
  const { name, level } = req.body

  db.query(
    'INSERT INTO skills (name, level) VALUES (?, ?)',
    [name, level],
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json({ message: 'Skill created', id: result.insertId })
    }
  )
})

// =====================
// DELETE SKILL
// =====================
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM skills WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err)
    res.json({ message: 'Skill deleted' })
  })
})

module.exports = router