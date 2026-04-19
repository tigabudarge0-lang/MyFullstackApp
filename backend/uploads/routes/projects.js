const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET all
router.get('/', projectController.getProjects);

// POST
router.post('/', projectController.createProject);

// PUT (update)
router.put('/:id', projectController.updateProject);

// DELETE
router.delete('/:id', projectController.deleteProject);

module.exports = router;