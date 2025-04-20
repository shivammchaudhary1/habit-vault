const User = require("../models/user.model.js");
const { encryptPassword, comparePassword } = require("../config/bcrypt.js");
const { signJwt } = require("../config/jwt.js");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password using helper
    const hashedPassword = await encryptPassword(password);

    // Create user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate token
    const token = signJwt({ id: newUser._id });

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = signJwt({ id: user._id });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

module.exports = { signup, login };
