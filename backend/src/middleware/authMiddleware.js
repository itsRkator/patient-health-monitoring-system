const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const tokenString = req.header("Authorization");

  // Check for the presence of the token
  if (!tokenString) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Extract the token from the Authorization header
  const token = tokenString.replace("Bearer ", "");

  try {
    // Verify the token using the access token secret
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken; // Store decoded user info in request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle token verification errors
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token has expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" }); // Handle any other errors
  }
};

module.exports = authMiddleware;
