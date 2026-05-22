const { closeAlertMessage } = require("../frontend/src/store/actions/alertAction");

const connectedUsers=new Map();


const addNewConnectedUser=({socketId,userId})=>{
    connectedUsers.set(socketId,{userId:userId});
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




module .exports={
    addNewConnectedUser,
    removeConnectedUser
}