var express = require('express');
var router = express.Router();
const User = require("../models/user");

let authController = require("../controller/login");

router.get("/login", authController.login);

router.get("/register", authController.register);
router.post("/login", authController.signin);
router.get('/logout', authController.signout);

router.post("/register", (req, res) => {
  if (!req.body  && req.body.password !== req.body.password_confirm) {
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
     // res.send(data)
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



module.exports = router;
  