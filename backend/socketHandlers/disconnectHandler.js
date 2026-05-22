const serverStore=require("../serverStore.js");
const disconnectHandler=(socket,io)=>{
serverStore.removeConnectedUser({socketId:socket.id});
io.emit("online-users",serverStore.getOnlineUsers());
};

module.exports=disconnectHandler;
