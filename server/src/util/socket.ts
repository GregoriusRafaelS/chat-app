import { Server } from "socket.io";

let io: Server;

export const initIo = (server: Server) => {
  io = server;
};

export const getIo = () => io;