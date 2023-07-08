const express = require("express");
const { createUser, signinUser, checkUser } = require("../controller/Auth");
const passport = require("passport");

const router = express.Router();
//  /auth is already added in base path
router
  .post("/signup", createUser)
  .post("/signin", passport.authenticate("local"), signinUser)
  .get("/check", passport.authenticate("jwt"), checkUser);
exports.router = router;
