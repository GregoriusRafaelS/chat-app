import { NextFunction, Request, Response } from "express";
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    status: "error",
    messages: "Not Found"
  })
}

export default notFoundHandler;