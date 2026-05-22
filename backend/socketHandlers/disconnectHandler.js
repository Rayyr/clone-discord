const serverStore=require("../serverStore.js");
const disconnectHandler=(socket)=>{
serverStore.removeConnectedUser({socketId:socket.id});
};

module.exports=disconnectHandler;
