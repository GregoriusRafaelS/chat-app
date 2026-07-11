const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if(!token) return res.status(400).json({msg: "Invalid Authentication"});
    if (token && token.startsWith("Bearer")) token = token.substring(7);
      jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
        if(err) return res.status(400).json({msg: "Authorization not valid"});
        req.user = user;
      next();
    })
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
}

module.exports = auth;