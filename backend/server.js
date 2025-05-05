const express = require("express");
const http = require("http");
require("dotenv").config();
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);
app.use(cors());
app.use(express.json());


const io = socketIo(server)

const chatRooms = {};

io.on("connection",(socket)=>{
    console.log("Connectd to socket.io");
    socket.on("join",(chatId)=>{
        socket.join(chatId);
        if(!chatRooms[chatId]){
            chatRooms[chatId] = [];
        }
        chatRooms[chatId].push(socket.id);
    })
    socket.on("message",message=>{
        io.to(message?.chatId).emit("message",message);        
    })

    socket.on("disconnect",()=>{
        console.log("User disconnected");
    })
})

const PORT = process.env.PORT || 8080;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

