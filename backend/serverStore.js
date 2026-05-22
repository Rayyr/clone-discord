const connectedUsers=new Map();


const addNewConnectedUser=({socketId,userId})=>{
    connectedUsers.set(socketId,{userId:userId.toString()});
console.log("New connected user");
console.log(connectedUsers);
}



const removeConnectedUser=({socketId})=>{
if(connectedUsers.has(socketId)){
    connectedUsers.delete(socketId);
console.log("New connected user removed");
console.log(connectedUsers);
}
    
}

const getOnlineUsers=()=>{
    const onlineUsers=[];

    connectedUsers.forEach((value)=>{
        if(!onlineUsers.includes(value.userId)){
            onlineUsers.push(value.userId);
        }
    });

    return onlineUsers;
}



module.exports={
    addNewConnectedUser,
    removeConnectedUser,
    getOnlineUsers
}
