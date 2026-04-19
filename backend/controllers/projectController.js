const db = require('../config/db');

// GET all projects
exports.getProjects = (req, res) => {
  const sql = "SELECT * FROM projects";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

// CREATE project
exports.createProject = (req, res) => {
  const { user_id, title, description, technologies, github_link, demo_link, image } = req.body;

  const sql = `
    INSERT INTO projects 
    (user_id, title, description, technologies, github_link, demo_link, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, title, description, technologies, github_link, demo_link, image], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Project created successfully" });
  });
};

// UPDATE project
exports.updateProject = (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const sql = "UPDATE projects SET title=?, description=? WHERE id=?";

  db.query(sql, [title, description, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Project updated successfully" });
  });
};

// DELETE project
exports.deleteProject = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM projects WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Project deleted successfully" });
  });
};