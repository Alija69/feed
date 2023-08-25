const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/vars");


const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token.split(" ")[1], jwtSecret, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(403).json({ error: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
};

exports.authorize = () => (req, res, next) =>
  verifyToken(req, res, next)
