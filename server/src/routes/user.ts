import express from "express"
const router = express.Router();

import {registerUser, loginHandler, getUserByToken} from "../controller/user"
import auth from "../middleware/auth"

//Register new User
router.post("/users/register", registerUser);

//Login user
router.post("/users/login", loginHandler);

//GET USER DATA BY TOKEN
router.get("/users/fetchAllUsers",auth, getUserByToken);

export default router;