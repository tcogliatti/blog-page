const express = require("express");
const NewsletterController = require("../controllers/Newsletter");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/newsletter", NewsletterController.suscribeEmail);
api.get("/newsletter", [md_auth.asureAuth], NewsletterController.getMails);
api.delete("/newsletter/:id", [md_auth.asureAuth], NewsletterController.deleteMail);

module.exports = api;