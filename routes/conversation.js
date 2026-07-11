const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const {addConversation, fetchConversation, createGroupChat, fetchGroup, exitGroup}  = require('../controller/conversation');

router.post('/conversation',auth, addConversation);
router.get('/conversation',auth, fetchConversation);
router.post('/conversation/createGroup',auth, createGroupChat);
router.get('/conversation/fetchGroup',auth, fetchGroup);
router.put('/conversation/exitGroup',auth, exitGroup);

module.exports = router
