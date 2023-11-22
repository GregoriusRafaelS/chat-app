const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const friend = require('../controller/friend');

router.get('/api/friends', auth, friend.getFriends)
router.get('/api/friends/pending', auth, friend.getFriendsPending)
router.post('/api/friends', auth, friend.addFriend)
router.delete('/api/friends/:email2', auth, friend.deleteFriend)

module.exports = router