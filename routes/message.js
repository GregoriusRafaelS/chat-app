const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {allMessages, sendMessage}  = require('../controller/message');
const uploadFile = require('../middleware/uploadFile');

router.route("/message/:chatId").get(auth, allMessages);
router.route("/message").post(auth, uploadFile.single('image'), sendMessage);

module.exports = router;