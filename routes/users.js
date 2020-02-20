const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST  api/users
// @desc    Register a user
// @access  Public
router.post('/', [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // findOne - mongoose function
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    })

    // e.g. 10 - determines how secure the Salt is
    const salt = await bcrypt.genSalt(10);

    // Generate a hashed version of the password
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // JWT starts here
    // Get back relevant information such as user id
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtSecret'), {
      // seconds
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;