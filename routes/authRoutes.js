const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: "User created" });
  } catch {
    res.status(400).json({ error: "Email already used" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token });
});

module.exports = router;
