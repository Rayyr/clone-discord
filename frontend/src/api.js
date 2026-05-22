import axios from 'axios';
import logout from './utils/auth.js';

const apiClient=axios.create({
    baseURL:"http://localhost:5000/api",
    timeout:1000,

})

apiClient.interceptors.request.use((config)=>{
const userDetails=localStorage.getItem("user");
if(userDetails){
    const token=JSON.parse(userDetails).token;
    config.headers.Authorization=`Bearer ${token}`;
}
return config;

},(error)=>{
    return Promise.reject(error);
}
)


export const login=async(data)=>{
    try{
return await apiClient.post("/auth/login",data);
    }catch(error){
return {
    error:true,
    error
}
    }
}




export const register=async(data)=>{
    try{
return await apiClient.post("/auth/register",data);
    }catch(error){
return {
    error:true,
    error
}
    }
}

export const sendFriendInvitation=async(data)=>{
    try{
return await apiClient.post("/friend-invitation/invite",data);
    }catch(error){
checkResponseCode(error);
return {
    error:true,
    error
}
    }
}

export const getPendingInvitations=async()=>{
    try{
return await apiClient.get("/friend-invitation/pending");
    }catch(error){
checkResponseCode(error);
return {
    error:true,
    error
}
    }
}

export const acceptFriendInvitation=async(data)=>{
    try{
return await apiClient.post("/friend-invitation/accept",data);
    }catch(error){
checkResponseCode(error);
return {
    error:true,
    error
}
    }
}

export const rejectFriendInvitation=async(data)=>{
    try{
return await apiClient.post("/friend-invitation/reject",data);
    }catch(error){
checkResponseCode(error);
return {
    error:true,
    error
}
    }
}

export const getFriends=async()=>{
    try{
return await apiClient.get("/friend-invitation/friends");
    }catch(error){
checkResponseCode(error);
return {
    error:true,
    error
}
    }
}

export const getDirectMessagesHistory=async(receiverUserId)=>{
    try{
return await apiClient.get(`/message/direct/${receiverUserId}`);
    }catch(error){
checkResponseCode(error);
return {
    error:true,
    error
}
    }
}

export const getUnreadMessages=async()=>{
    try{
return await apiClient.get("/message/unread");
    }catch(error){
checkResponseCode(error);
return {
    error:true,
    error
}
    }
}


const checkResponseCode=(error)=>{

    const responseCode=error?.response?.status;
    if(responseCode){
        (responseCode===401  || responseCode===403)&&logout();
    }
}
