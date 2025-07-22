// import { Server } from 'socket.io'
// import http from 'http'
// import express from 'express'
// import { Socket } from 'dgram';
// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: ["http://localhost:5173"],
//     }
// });

// export function getReceiverSocketId(userId){
//     return userSocketMap[userId];
// };
// //to store online users as {userId:socketId}
// const userSocketMap = {};

// io.on("connection", (socket) => {
//     console.log("new user ", socket.id);
//     const userId = socket.handshake.query.userId;
//     if(userId) userSocketMap[userId]=socket.id;
    
//     //send event of connection to all clients
//     io.emit("getOnlineUsers",Object.keys(userSocketMap));

//     socket.on("disconnect", () => {
//         console.log("user gone ", socket.id);
//         delete userSocketMap[userId];
//         //send event of disconnection to all clients
//         io.emit("removeOnlineUsers",Object.keys(userSocketMap));
//     });
// })


// export { io, app, server };

import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// ✅ Apply necessary middleware HERE
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

const server = http.createServer(app);

// ✅ Also configure socket.io CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// To store online users as {userId: socketId}
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("new user ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user gone ", socket.id);
    delete userSocketMap[userId];
    io.emit("removeOnlineUsers", Object.keys(userSocketMap));
  });
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export { io, app, server };
