const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register new user
// @route   POST /api/auth
// @access  Public
const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error("Please provide all fields: name, email and password");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password length must be more than 6 characters");
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const tokenUser = createTokenUser(user);
    res.status(201).json({
      user: tokenUser,
      token: generateToken({ payload: tokenUser }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// @desc    Login user
// @route   POST /api/auth
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide all fields: email and password");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const tokenUser = createTokenUser(user);
    res.json({ user: tokenUser, token: generateToken({ payload: tokenUser }) });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
};

const generateToken = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const createTokenUser = (user) => {
  return { userId: user._id, name: user.name, email: user.email };
};

module.exports = { register, login };
