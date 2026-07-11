import { io } from 'socket.io-client'

const beUrl = process.env.REACT_APP_BE_URL;

export const socket = io(beUrl);