const express = require("express");
const router = express.Router();
const db = require("../config/db");
const auth = require("../middleware/auth");

// ✅ GET PROJECTS
router.get("/", auth, (req, res) => {
  db.query("SELECT * FROM projects", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✅ ADD PROJECT
router.post("/", auth, (req, res) => {
  const { title, description } = req.body;

  db.query(
    "INSERT INTO projects (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Project added" });
    }
  );
});

// ✅ UPDATE PROJECT
router.put("/:id", auth, (req, res) => {
  const { title, description } = req.body;

  db.query(
    "UPDATE projects SET title=?, description=? WHERE id=?",
    [title, description, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Project updated" });
    }
  );
});

// ✅ DELETE PROJECT
router.delete("/:id", auth, (req, res) => {
  db.query(
    "DELETE FROM projects WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "Project deleted" });
    }
  );
});

module.exports = router;