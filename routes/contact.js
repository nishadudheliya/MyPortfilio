const express = require("express");
const route = express.Router();
const { ensureAuthenticated } = require("../config/authGuard");
const services = require("../services/contact");
const controller = require("../controller/contact");


/**
 *  @description add contact
 *  @method GET /add-contact
 */
route.get("/add-contact", ensureAuthenticated, services.add_contact);

/**
 *  @description update contact
 *  @method GET /update-contact
 */
// route.get("/update-contact", ensureAuthenticated, services.update_contact);

// API
route.post("/api/contact", controller.create);
route.get("/api/contact", controller.find);
route.get("/", controller.displayContactList);
route.put("/", controller.update);
route.delete("/", controller.delete);

module.exports = route;
