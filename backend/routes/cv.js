const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// =========================
// UPLOAD CV
// =========================
router.post("/upload", upload.single("cv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "CV uploaded successfully",
    file: req.file.filename
  });
});

// =========================
// GET CV LIST
// =========================
router.get("/", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).json({ message: "Error reading files" });

    const pdfs = files.filter(f => f.endsWith(".pdf"));
    res.json(pdfs);
  });
});

// =========================
// DELETE CV
// =========================
router.delete("/:filename", (req, res) => {
  const filePath = path.join("uploads", req.params.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "Deleted successfully" });
  });
});

module.exports = router;