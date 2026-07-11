import express from "express"
const router = express.Router();

import auth from "../middleware/auth";
import {addConversation, fetchConversation, createGroupChat, fetchGroup, exitGroup} from "../controller/conversation";

router.post('/conversation',auth, addConversation);
router.get('/conversation',auth, fetchConversation);
router.post('/conversation/createGroup',auth, createGroupChat);
router.get('/conversation/fetchGroup',auth, fetchGroup);
router.put('/conversation/exitGroup',auth, exitGroup);

export default router;