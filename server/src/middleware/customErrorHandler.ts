import { NextFunction, Request, Response } from "express";

const customErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.status || 500).json({
    status: "error",
    messages: error.message
  })
}

export default customErrorHandler;