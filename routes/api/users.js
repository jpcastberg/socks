const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');
// Load User model
const User = require('../../models/User');
// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const router = express.Router();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) return res.status(400).json(errors);
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ email: 'Email already exists!' });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (saltErr, salt) => {
      if (saltErr) throw new Error(saltErr);
      bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
        if (hashErr) throw new Error(hashErr);
        newUser.password = hash;
        newUser
          .save()
          .then(returnedUser => res.json(returnedUser))
          .catch(mongoErr => console.log(mongoErr));
      });
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) return res.status(400).json(errors);
  const { email, password } = req.body;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) return res.status(404).json({ emailnotfound: 'Email not found' });
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const { id, name } = user;
        const payload = { id, name };
        const { secretOrKey } = keys;
        const expiresIn = 31556926; // 1 year in seconds
        // Sign token
        jwt.sign(payload, secretOrKey, { expiresIn }, (err, token) => {
          if (err) throw new Error(err);
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;
