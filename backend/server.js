const express = require("express");
const http = require("http");
require("dotenv").config();
const cors = require("cors");
const socketIo = require("socket.io");
const connectDb = require("./connectDb");
const globalError = require("./middlewares/globalError")
const resendEmail = require("./services/sendEmail");
const User = require("./models/user");
const app = express();
const server = http.createServer(app);

connectDb();
app.use(cors());
app.use(express.json());

app.get("/",(req,res,next)=>{
    resendEmail();
    res.json({
        message:"sent"
    })
})

const io = socketIo(server)

const chatRooms = {};

io.on("connection",(socket)=>{
    console.log("Connectd to socket.io");

    socket.on("login",async (email)=>{
        try{
            console.log("email ",email)
            const [user,created] =await  User.findOrCreate({
            where:{
                email
            },
            defaults:{
                email
            }
        })
        socket.emit("userCreated",{
            id:user?.dataValues?.id,
            email:user?.dataValues?.email,
        })
        }catch(error){

        }
    })
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


app.use(globalError);

const PORT = process.env.PORT || 8080;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

