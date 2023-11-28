const express = require("express");
const router = express.Router();
const register = require('../controllers/register')

router.get("/", (req, res) => {
  res.end("/");
});
router.post("/", function (req, res) {
  res.end("/");
});




router.get("/register", register.form) 
router.post("/register", function (req, res) {});





router.get("/login", function (req, res) {
  res.render("login.ejs");
});
router.post("/login", function (req, res) {});

router.get("/test", function (req, res) {
  res.end("/test");
});


module.exports = router;
