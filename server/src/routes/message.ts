import express from "express"
const router = express.Router();

import auth from "../middleware/auth"
import {allMessages, sendMessage}  from "../controller/message"
import uploadFile from "../middleware/uploadFile"

router.route("/message/:convId").get(auth, allMessages);
router.route("/message").post(auth, uploadFile.single('image'), sendMessage);

export default router;