const express = require('express');
const router = express.Router();
const { 
  registerUser, loginHandler, getUserByToken,
} = require('../controller/user');

const auth = require('../middleware/auth');

//Register new User
router.post("/users/register", registerUser);

//Login user
router.post("/users/login", loginHandler);

//GET USER DATA BY TOKEN
router.get("/users/fetchAllUsers",auth, getUserByToken);

module.exports = router;