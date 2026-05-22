
const serverStore =require("../serverStore");


const newConnectionHandler=async(socket,io)=>{
    const userDetails=socket.user;



    serverStore.addNewConnectedUser({
        socketId:socket.id,
        userId:userDetails.userId
    })

    io.emit("online-users",serverStore.getOnlineUsers());
}


module.exports=newConnectionHandler;
