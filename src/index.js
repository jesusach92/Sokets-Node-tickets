import { io, server } from "./app";
import dotenv from "dotenv";

dotenv.config()
 const PORT = process.env.PORT_SERVER || 3001;

 server.listen(PORT, ()=>{
     console.log("Server is Running on PORT:" + PORT)
 })

 io.on('connection',(socket)=>{
     socket.broadcast.emit("USER_CONECTED", )
     console.log(`user Conected: ${socket.id} `);
     socket.on("SEND_MESSAGE",(data)=>{
         let message = {
             user: data.user,
             message: data.message
         }
         socket.broadcast.emit("RECEIVE_MESSAGE", message)
     })
 })
