/**
 * Copyright © 2017 DOU Networks. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jun 22, 2017
 */
const express = require('express');
const _ = require('lodash');
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
const request = require('request');
const models = require('../models');
const LocalStrategy = require('passport-local').Strategy;
const secretOrKey = 'X9Asjkls078a8790aldsf7lkaw2';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findById(id).then((user) => {
    done(null, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  models.User.findOne({
    where: { email: email.toLowerCase() }
  }).then(user => {
    if (!user) {
      return done(null, false, { msg: `Email ${email} not found.` });
    }
    console.log(user.password);
    comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { msg: 'Invalid email or password.' });
    });
  })
}));


function comparePassword(candidatePassword, dbPassword, cb) {
  console.log(candidatePassword)
  bcrypt.compare(candidatePassword, dbPassword, (err, isMatch) => {
    cb(err, isMatch);
  });
};
/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/signin');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
