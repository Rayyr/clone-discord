const registerSocketServer=(server)=>{
    const op=require("socket.io")(server,{
        cors:{
            origin:"*",
            methods:["Get","Post"]
        }
    });
    io.on("connection",(socket)=>{
        console.log("user connected");
        console.log(socket.id);
    })

}

module.exports={
    registerSocketServer
}