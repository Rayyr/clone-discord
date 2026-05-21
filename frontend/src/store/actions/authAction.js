import * as api from "../../api.js";

export const authAction={
    SET_USER_DETAILS:"AUTH.SET_USER_DETAILS"
}


export const getAction=(dispatch)=>{
    return {
        login:(userDetails,Navigate)=>dispatch(login(userDetails,Navigate)),
        register:(userDetails,Navigate)=>dispatch(register(userDetails,Navigate))
    
    }
}


export const login=(userDetails,Navigate)=>{
    return async(dispatch)=>{
        const response=await api.login(userDetails)
     if(response.error){
        //show error
     }
     else{
        const {userDetails}=response.data;
        localStorage.setItem("user",JSON.stringify(userDetails));
        dispatch(setUserDetails(userDetails));
        Navigate("/dashboard")
     }
    }
     
}


const setUserDetails=(userDetails)=>{
    return{
        type:authAction.SET_USER_DETAILS,
        userDetails
    }
}



export const register=(userDetails,Navigate)=>{
    return async(dispatch)=>{
        const response=await api.register(userDetails)
     if(response.error){
        //show error
     }
     else{
        const {userDetails}=response.data;
        localStorage.setItem("user",JSON.stringify(userDetails));
        dispatch(setUserDetails(userDetails));
        Navigate("/dashboard")
     }
    }
     
}
