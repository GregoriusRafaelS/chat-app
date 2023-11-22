require('dotenv').config();

//ambil module express
const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.static('files'));
app.use(
  cors({
    origin: "*",
  })
);

//ambil router yang mengandle endpoint user
const userRouter = require('./routes/user');
const chatRouter = require('./routes/chat');
const friendRouter = require('./routes/friend');
const messageRouter = require('./routes/message');
const association = require('./util/assoc_db');

//jalanin router
app.use(userRouter);
app.use(friendRouter);
app.use(chatRouter);
app.use(messageRouter);

//ambil data dari dotenv
const PORT = process.env.PORT;

association()
.then(()=>{
  app.listen(PORT,()=>{
    console.log('server is running on port 5000');
  })
})
.catch(err=>{
  console.log(err.message);
})