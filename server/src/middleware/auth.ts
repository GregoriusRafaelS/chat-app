import { Request, Response, NextFunction } from "express";
import { UserPayload } from "../types/express";

const jwt = require('jsonwebtoken');

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.header("Authorization");
    if(!token) return res.status(400).json({msg: "Invalid Authentication"});
    if (token && token.startsWith("Bearer")) token = token.substring(7);
      jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err: Error, user: UserPayload) => {
        if(err) return res.status(400).json({msg: "Authorization not valid"});
        req.user = user;
      next();
    })
  } catch (err: any) {
    return res.status(500).json({msg: err.message});
  }
}

export default auth;