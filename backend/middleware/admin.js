module.exports = function (req, res, next) {
  // req.user comes from auth middleware

  if (!req.user) {
    return res.status(401).json({ msg: "No user found" });
  }

  // check role
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only access" });
  }

  next();
};