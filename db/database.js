const mongoose = require('mongoose');

require('./helpers.js');

// DB Config
const db = require('../config/keys').mongoURI;
// Connect to MongoDB
module.exports = mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));
