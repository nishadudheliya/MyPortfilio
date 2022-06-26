var express = require('express');
var router = express.Router();
const User = require("../models/user");

let authController = require("../controller/login");

router.get("/login", authController.login);

router.get("/register", authController.register);
router.post("/login", authController.signin);
router.get("/logout", authController.signout);

router.post("/register", (req, res) => {
  if (!req.user && req.body.password === req.body.password_confirm) {
    console.log(req.body);

    let user = new User(req.body);
    user.provider = 'local';
    console.log(user);

    user.save((err) => {
      if (err) {
        let message = getErrorMessage(err);

        req.flash('error', message);
        return res.render('user/register', {
          title: 'Sign-up Form',
          messages: req.flash('error'),
          user: user
        });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
  });



module.exports = router;
  