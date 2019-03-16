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
