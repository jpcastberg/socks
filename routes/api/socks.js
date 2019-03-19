const express = require('express');

// Load User model
const User = require('../../models/User');
require('../../db/database.js');

const router = express.Router();

// @route GET api/socks/
// @desc Get today's socks for a user
// @access Public
router.get('/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id }).then((data) => {
    const { sockHistory } = data;
    res.status(200).send(sockHistory).end();
  });
});

router.get('/all/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({ _id: id }).then((data) => {
    const { socks } = data;
    res.status(200).send(socks).end();
  });
});

router.post('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  User.findOne({ _id: id }).then((user) => {
    user.socks.push(body);
    User.findOneAndUpdate({ _id: id }, user).then(() => {
      res.status(201).end();
    });
  });
});

module.exports = router;
