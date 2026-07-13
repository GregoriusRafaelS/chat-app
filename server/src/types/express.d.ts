import { Request } from "express";

export interface UserPayload{
  userId: number,
  fullName: string,
}

declare global{
  namespace Express{
    interface Request{
      user ?: UserPayload
    }
  }
  namespace NodeJS{
    interface ProcessEnv{
      PORT: string,
      DB_Name: string,
      DB_USERNAME: string,
      DB_PASSWORD: string,
      DB_URL,
      TOKEN_SECRET_KEY: string,
      AES_KEY: string,
      AES_IV: string
    }
  }
}