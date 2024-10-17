const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const tokenString = req.header("Authorization");

  if (!tokenString) return res.status(401).json({ message: "Unauthorized" });

  const token = tokenString.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    res.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
