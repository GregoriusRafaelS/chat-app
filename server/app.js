require('dotenv').config();

const express = require('express');
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io")

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

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("send-message", (message) => {
    console.log(message)
    io.emit("receive-message", message)
  });
});

const userRouter = require('./routes/user');
const conversationRouter = require('./routes/conversation');
// const friendRouter = require('./routes/friend');
const messageRouter = require('./routes/message');

app.use(userRouter);
// app.use(friendRouter);
app.use(conversationRouter);
app.use(messageRouter);

const PORT = process.env.PORT;

httpServer.listen(PORT,()=>{
  console.log('server is running on port 5000');
})
