require('dotenv').config();

import express from "express";

import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io"
import path from "path";

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
  socket.on("join-conversation", (convId: number) => {
    socket.join(`conversation-${convId}`)
  })
  socket.on("send-message", ({convId, senderId, content, mediaUrl, createdAt}) => {
    io.to(`conversation-${convId}`).emit("receive-message", {conversationId: convId, content: content, senderId: senderId, mediaUrl: mediaUrl, createdAt: createdAt });
  });
});

import userRouter from "./routes/user";
import conversationRouter from "./routes/conversation";
import messageRouter from "./routes/message";
import customErrorHandler from "./middleware/customErrorHandler";
import notFoundHandler from "./middleware/notFoundHandler";

app.use('/', express.static(path.join(process.cwd(), 'src', 'files')));
app.use(userRouter);
app.use(conversationRouter);
app.use(messageRouter);

app.use(customErrorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT;

httpServer.listen(PORT,()=>{
  console.log('server is running on port 5000');
})
