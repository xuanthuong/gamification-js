/**
 * Copyright © 2017 DOU Networks. All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by luc <luc@ltv.vn> on Jun 22, 2017
 */
const async = require('async');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/usermongo');
const { ROOT, SIGN_IN, DASHBOARD } = require('../configs/constants').ROUTES;

/**
 * GET /signin
 * SignIn page.
 */
const getSignIn = (req, res) => {
  if (req.user) {
    res.render('dashboard/index', {
      title: 'Dash board'
    });
  } else {
    let msg = "Required fields*";
    msg = req.flash("info")[0];
    if(msg!=undefined){
      msg = msg.msg;
    }
    res.render('auth/signin/index', {
      title: 'Sign In',
      msg: msg
    });
  }
};

/**
 * POST /login
 * Sign in using email and password.
 */
const postSignIn = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();
  if (errors) {
    req.flash('info', errors);
    return res.redirect(SIGN_IN);
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('info', info);
      return res.redirect(SIGN_IN);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash('info', { msg: 'Success! You are logged in.' });
      res.redirect(req.session.returnTo || ROOT);
    });
  })(req, res, next);
};

/**
 * GET /signOut
 * Sign out.
 */
const signOut = (req, res) => {
  console.log(new Date(1504319474));
  req.logout();
  res.redirect(ROOT);
};

/**
 * GET /signup
 * Signup page.
 */
const getSignup = (req, res) => {
  if (req.user) {
    return res.redirect(ROOT);
  }
  res.render('auth/signUp', {
    title: 'Create Account'
  });
};

module.exports = {
  getSignIn,
  postSignIn,
  signOut,
  getSignup
};
