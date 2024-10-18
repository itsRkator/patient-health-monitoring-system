const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// Generate a new access token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Generate a new refresh token
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // Set expiration time as needed
  );
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token to the user document
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const signup = async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;
  try {
    if (!username || !email || !firstName || !lastName || !password) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token to the user document
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Endpoint to refresh the access token
const refresh = async (req, res) => {
  const { token } = req.body; // Assuming the refresh token is sent in the body
  if (!token) return res.sendStatus(401); // Unauthorized if no token is provided

  try {
    // Find the user with the provided refresh token
    const user = await User.findOne({ refreshToken: token });
    if (!user) return res.sendStatus(403); // Forbidden if token is invalid

    // Verify the refresh token
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err) => {
      if (err) return res.sendStatus(403); // Forbidden if refresh token is invalid

      // Generate a new access token
      const accessToken = generateAccessToken(user);
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, signup, refresh };
