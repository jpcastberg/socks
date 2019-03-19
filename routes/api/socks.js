const express = require('express');

// Load User model
const User = require('../../models/User');
require('../../db/database.js');

const router = express.Router();

// @route GET api/socks/
// @desc Get all socks for a user
// @access Public
router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id }).then((data) => {
    const { sockHistory } = data;
    res.status(200).send(sockHistory).end();
    console.log(data);
  });
});

// // @route POST api/users/login
// // @desc Login user and return JWT token
// // @access Public
// router.post('/login', (req, res) => {
//   // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
//   // Check validation
//   if (!isValid) return res.status(400).json(errors);
//   const { email, password } = req.body;
//   // Find user by email
//   User.findOne({ email }).then((user) => {
//     // Check if user exists
//     if (!user) return res.status(404).json({ emailnotfound: 'Email not found' });
//     // Check password
//     bcrypt.compare(password, user.password).then((isMatch) => {
//       if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const { id, name } = user;
//         const payload = { id, name };
//         const { secretOrKey } = keys;
//         const expiresIn = 31556926; // 1 year in seconds
//         // Sign token
//         jwt.sign(payload, secretOrKey, { expiresIn }, (err, token) => {
//           if (err) throw new Error(err);
//           res.json({ success: true, token: `Bearer ${token}` });
//         });
//       } else {
//         return res
//           .status(400)
//           .json({ passwordIncorrect: 'Password incorrect' });
//       }
//     });
//   });
// });

module.exports = router;
