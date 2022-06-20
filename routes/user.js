var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/user");

const { forwardAuthenticated } = require("../config/authGuard");
let authController = require("../controller/login");

router.get("/login", forwardAuthenticated, authController.login);

router.get("/register", forwardAuthenticated, authController.register);

router.post("/register", (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  // new contact
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    dob: req.body.dob,
    gender: req.body.gender,
    contact_number: req.body.contact_number,
    password: req.body.password,
  });
  // save contact in the database
  user
    .save(user)
    .then((data) => {
      //res.send(data)
      res.redirect("/user/login");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
  });
  
  router.post("/login", (req, res, next) => {
    try{
      let foundUser = User.find((data) => req.email === res.email);
      if (foundUser) {
        
          let submittedPass = req.password; 
          let storedPass = foundUser.password; 
  
          // const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
          if (submittedPass === storedPass) {
              res.redirect("/dashboard");
          } else {
            res.redirect("/user/login");
          }
      }
      else {
        res.redirect("/user/login");
      }
  } catch{
      res.send("Internal server error");
  }
  });
  
  // Logout
  router.get("/logout", (req, res) => {
    req.logout();
    alert("You are logged out");
    res.redirect("/user/login");
  });
  
  module.exports = router;
  



module.exports = router;