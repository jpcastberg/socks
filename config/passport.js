const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  const strategy = new Strategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
      .then((user) => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch(err => console.log(err));
  });
  passport.use(strategy);
};
