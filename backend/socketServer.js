const verifyToken = require("./middleware/verifyToken.js");
const newConnectionHandler=require("./socketHandlers/newConnectionHandler.js");
const disconnectHandler=require("./socketHandlers/disconnectHandler.js");
const directMessageHandler=require("./socketHandlers/directMessageHandler.js");
const serverStore=require("./serverStore.js");

const registerSocketServer=(server)=>{
    const io=require("socket.io")(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    });
    serverStore.setSocketServerInstance(io);
   
   io.use((socket,next)=>{
    verifyToken(socket,next);
   })
   
    io.on("connection",(socket)=>{
        console.log("user connected");
        console.log(socket.id);
        newConnectionHandler(socket,io);
        socket.on("direct-message",(data)=>{
            directMessageHandler(socket,io,data);
        })
        socket.on("disconnect",()=>{
            disconnectHandler(socket,io);
        })
    })

}

module.exports={
    registerSocketServer
}
