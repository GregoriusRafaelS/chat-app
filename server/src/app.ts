require('dotenv').config();

import express from "express";

import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io"

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use(express.static('files'));
app.use(
  cors({
    origin: "*",
  })
);

io.on("connection", (socket: Socket) => {
  console.log("User Connected");
  socket.on("send-message", (message: string) => {
    console.log(message)
    io.emit("receive-message", message)
  });
});

import userRouter from "./routes/user";
import conversationRouter from "./routes/conversation";
import messageRouter from "./routes/message";

app.use(userRouter);
app.use(conversationRouter);
app.use(messageRouter);

const PORT = process.env.PORT;

httpServer.listen(PORT,()=>{
  console.log('server is running on port 5000');
})
