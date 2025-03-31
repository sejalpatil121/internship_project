const User = require('../models/user.model');
const { generateToken } = require('../config/jwt');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Admin Login Attempt:");
    console.log("Email:", email);
    console.log("Password (from request):", password);

    const user = await User.findOne({ email, role: 'admin' });

    console.log("User found in database:", user);

    if (!user) {
      console.log("Admin user not found.");
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    console.log("Hashed password from database:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch.");
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const token = generateToken(user._id, user.role);

    console.log("Token generated:", token);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ error: error.message });
  }
};
exports.registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (process.env.ALLOW_ADMIN_REGISTRATION !== 'true') {
      return res.status(403).json({ error: 'Admin registration is disabled' });
    }

    const existingAdmin = await User.findOne({ email, role: 'admin' });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = await User.create({
      username,
      email,
      password,
      role: 'admin'
    });

    const token = generateToken(admin._id, 'admin');

    res.status(201).json({
      token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};