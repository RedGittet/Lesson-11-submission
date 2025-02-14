const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User signup
const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ userId: user._id, email, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ userId: user._id, email, token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signup, login };
