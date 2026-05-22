import io from 'socket.io-client';
import { addMessage, setOnlineUsers } from '../../store/actions/dashboardAction.js';


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
        dispatch(addMessage(message));
    })
}

export const sendDirectMessage=(data)=>{
    socket?.emit("direct-message",data);
}
