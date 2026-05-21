export const validateLoginForm=({mail,password})=>{
    const isMailValid= validateEmail(mail);
    const isPasswordValid=validatePassword(password);

    return isPasswordValid &&isMailValid;
}


const validateEmail=(mail)=>{
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(mail);
}


const validatePassword=(password)=>{
    return password.length>6&&password.length<12;
}