const serverStore=require("../socketServer.js");
const disconnectHandler=(socket)=>{
serverStore.removeConnectedUser(socket.id);
};

module.exports=disconnectHandler;
