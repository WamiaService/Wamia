const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const PORT = 4000;
const server = http.createServer(app);

const io = new Server(server);
const messagesRouter = require('../server/routes/messages.routes')
app.use("/msg",messagesRouter)
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Socket.IO server is running on port:", PORT);
});
