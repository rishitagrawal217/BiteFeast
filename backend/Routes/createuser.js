const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtsecret = "yeekrandomstringhaisopleasechill";

router.post(
  "/createuser",
  [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error during user creation:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

router.post(
  "/loginuser",
  [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: "Invalid email or password" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password);

      if (!pwdCompare) {
        return res.status(400).json({ errors: "Invalid email or password" });
      }

      const data = {
        user: {
          id: user.id
        }
      };

      const authToken = jwt.sign(data, jwtsecret);

      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
