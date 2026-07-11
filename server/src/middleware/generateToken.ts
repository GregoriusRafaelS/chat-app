import { UserPayload } from "../types/express";

import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

const generateToken = (user: UserPayload) => {
  return jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "1h"
  });
}

export default generateToken;