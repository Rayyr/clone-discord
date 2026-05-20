const User=require("../models/users.js");
const bcrypt=require("bcrypt");

const register=async(req,res)=>{
    try{

        const {username,mail,password}=req.body;
        const userExists=await User.exists({mail:mail.toLowerCase()});
  if(userExists){
    return res.status(409).send("Email is already exists");
  }
  const ecncryptPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        username,mail,password:ecncryptPassword
    })
  res.status(201).json({
    userDetails:{
        mail:user.mail,
        username:user.username
    }
  })
    }catch(error){

    }
} 


module.exports=
    register;