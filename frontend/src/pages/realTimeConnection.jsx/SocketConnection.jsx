import io from 'socket.io-client';


let socket=null;
export const connectionSocketServer=(userDetails)=>{
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
}