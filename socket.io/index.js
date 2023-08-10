const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const PORT = 4000
const server = http.createServer(app)

const io = new Server()
io.on("connection",(Socket)=>{
    console.log(("user connected =>" + Socket.id))
    Socket.on("disconected",()=>{
        console.log("user disconnected",Socket.id);
    })
})


server.listen(PORT,()=>{
    console.log("Server socket run :" + PORT);
})