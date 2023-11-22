const Friend = require('../model/Friend');
const User = require('../model/User');

const friendController = {
  getFriends: async (req, res) => {
    try {
      const friends1 = await Friend.findAll({userId1: req.user.id});
      const friends2 = await Friend.findAll({userId2: req.user.id});
      
      console.log(friends1)
      const friends = [...friends1, ...friends2];
      
      res.json(friends);
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  getFriendsPending: async (req, res) => {
    try {
      const listPendingFriends = await Friend.findAll({userId2: req.user.id});
      
      res.json(listPendingFriends);
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  addFriend: async (req, res) => {
    try {
      const id1 = req.user.id;
      const email2 = req.body.email2;

      const checkFriend = await User.findOne({
        where: {
          email: email2
        }
      });

      if (checkFriend == undefined){
        const error = new Error("wrong email");
        error.statusCode = 400;
        throw error;
      }
      
      await Friend.create({
        userId1: id1,
        userId2: checkFriend.id,
        status: 'pending'
      });

      res.json({msg: "Adding a Friend"});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  deleteFriend: async(req, res) => {
    try {
      await Friend.findOne({
        where: {
          id: req.params.id
        }
      });
      res.json({msg: "Deleted a Friend"})
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }
}

module.exports = friendController;