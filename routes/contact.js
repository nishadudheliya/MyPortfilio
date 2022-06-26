var express = require('express');
var router = express.Router();
const services = require("../services/contact");
const controller = require("../controller/contact");

function ensureAuthenticated(req, res, next)
 {
     // check if the user is logged in
     if(! req.isAuthenticated())
     {
         req.session.url = req.originalUrl;
         return res.redirect('/user/login');
     }
     next();
 }

router.get("/add-contact",  services.add_contact);

/**
 *  @description update contact
 *  @method GET /update-contact
 */
 router.get("/edit/:id", ensureAuthenticated, controller.displayEditPage);

// API
router.post("/api/contact", ensureAuthenticated, controller.create);
router.get("/api/contact", controller.find);
router.get("/", controller.displayContactList);
router.post("/edit/:id", ensureAuthenticated, controller.update);
router.get("/delete/:id", ensureAuthenticated, controller.delete);


module.exports = router;