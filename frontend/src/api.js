import axios from 'axios';

const apiClient=axios.create({
    baseURL:"http://localhost:5000/api",
    timeout:1000,

})

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
