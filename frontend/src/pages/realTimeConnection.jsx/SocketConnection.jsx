import io from 'socket.io-client';
import {
    addMessage,
    addPendingInvitation,
    markMessagesRead,
    setFriends,
    setOnlineUsers,
} from '../../store/actions/dashboardAction.js';


let socket=null;
export const connectionSocketServer=(userDetails,dispatch)=>{
    const jwtToken=userDetails.token;
    socket=io("http://localhost:5000",{
        auth:{
            token:jwtToken
        }
    });
    socket.on("connect",()=>{
        console.log("success connected");
console.log(socket.id);
    })

    socket.on("online-users",(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
    })

    socket.on("direct-message",(message)=>{
        dispatch(addMessage({
            ...message,
            isOwn: message.senderUserId === userDetails.userId,
        }));
    })

    socket.on("messages-read",(data)=>{
        dispatch(markMessagesRead(data));
    })

    socket.on("friend-invitation",(invitation)=>{
        dispatch(addPendingInvitation(invitation));
    })

    socket.on("friend-list-updated",(friends)=>{
        dispatch(setFriends(friends));
    })
}

export const sendDirectMessage=(data)=>{
    socket?.emit("direct-message",data);
}

export const readMessages=(data)=>{
    socket?.emit("read-messages",data);
}
