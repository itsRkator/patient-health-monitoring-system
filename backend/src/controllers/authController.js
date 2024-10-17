const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
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

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, signup };
