const verifyToken = require("./middleware/verifyToken.js");
const newConnectionHandler=require("./socketHandlers/newConnectionHandler.js");

const registerSocketServer=(server)=>{
    const io=require("socket.io")(server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        }
    });
   
   io.use((socket,next)=>{
    verifyToken(socket,next);
   })
   
    io.on("connection",(socket)=>{
        console.log("user connected");
        console.log(socket.id);
        newConnectionHandler(socket,io);
    })

}

module.exports={
    registerSocketServer
}
