export const validateLoginForm=({mail,password})=>{
    const isMailValid= validateEmail(mail);
    const isPasswordValid=validatePassword(password);

    return isPasswordValid &&isMailValid;
}


export const validateRegisterForm=({mail,password,username})=>{
    const isMailValid= validateEmail(mail);
    const isPasswordValid=validatePassword(password);
    const isUsernameValid=validateUsername(username);

    return isPasswordValid &&isMailValid&&isUsernameValid;
}



const validateEmail=(mail)=>{
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(mail);
}


const validatePassword=(password)=>{
    return password.length>6&&password.length<12;
}


const validateUsername=(username)=>{
    return username.length>2&&username.length<12;
}