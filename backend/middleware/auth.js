const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // MUST include role inside token

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};