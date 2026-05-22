const connectedUsers=new Map();


const addNewConnectedUser=({socketId,userId})=>{
    connectedUsers.set(socketId,{userId:userId});

}



module .exports={
    addNewConnectedUser
}