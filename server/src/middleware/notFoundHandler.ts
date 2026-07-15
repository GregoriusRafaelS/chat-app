import { NextFunction, Request, Response } from "express";
const notFoundHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log("AKU DISINI")
  return res.status(404).json({
    status: "error",
    messages: "Not Found"
  })
}

export default notFoundHandler;