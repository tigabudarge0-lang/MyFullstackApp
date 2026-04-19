const express = require('express')
const router = express.Router()
const db = require('../config/db')

// GET all posts
router.get('/', (req, res) => {
  db.query('SELECT * FROM blog', (err, result) => {
    if (err) return res.status(500).json(err)
    res.json(result)
  })
})

// ADD post
router.post('/', (req, res) => {
  const { title, content } = req.body

  db.query(
    'INSERT INTO blog (title, content) VALUES (?, ?)',
    [title, content],
    (err, result) => {
      if (err) return res.status(500).json(err)
      res.json({ message: 'Post created' })
    }
  )
})

// DELETE post
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM blog WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err)
    res.json({ message: 'Post deleted' })
  })
})

module.exports = router