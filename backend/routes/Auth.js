const express = require("express");
const { createUser, signinUser } = require("../controller/Auth");

const router = express.Router();
//  /auth is already added in base path
router.post("/signup", createUser).post("/signin", signinUser);

exports.router = router;
