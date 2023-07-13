const express = require("express");
const { createUser, signinUser, checkAuth } = require("../controller/Auth");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router
  .post("/signup", createUser)
  .post("/signin", passport.authenticate("local"), signinUser)
  .get("/check", passport.authenticate("jwt"), checkAuth);
exports.router = router;
