const User=require("../models/users.js");
const bcrypt=require("bcrypt");

const login=async(req,res)=>{
    try{

        const {mail,password}=req.body;
        const user=await User.findOne({mail:mail.toLowerCase()});
   if(user&&(await bcrypt.compare(password,user.password))){

    return res.status(200).json({
        userDetails:{
            mail:user.mail,
            username:user.username
        }
    })
   }
   return res.status(400).send("Invalid credinatials,please try again");
    }catch(error){
   return res.status(500).send("Something went wrong , please try again");

    }
} 


module.exports=    login;
