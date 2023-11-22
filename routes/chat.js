const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {accessChat, fetchChat, createGroupChat, fetchGroup, exitGroup}  = require('../controller/chat');

router.post('/chat',auth, accessChat);
router.get('/chat',auth, fetchChat);
router.post('/chat/createGroup',auth, createGroupChat);
router.get('/chat/fetchGroup',auth, fetchGroup);
router.put('/chat/exitGroup',auth, exitGroup);

module.exports = router
