import io from 'socket.io-client';


let socket=null;
export const connectionSocketServer=()=>{
    socket=io("http://localhost:5000");
    socket.on("connect",()=>{
        console.log("success connected");
console.log(socket.id);
    })
}