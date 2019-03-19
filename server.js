const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const socks = require('./routes/api/socks');
require('./db/database.js');

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
// Routes
app.use('/api/users', users);
app.use('/api/socks', socks);

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/bundle.js'), (err) => {
    if (err) res.status(500).send(err);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/public/index.html'), (err) => {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));
