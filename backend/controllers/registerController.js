const User=require("../models/users.js");
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');

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
 
    const token=jwt.sign({
      userId:user._id,
      mail
    },
    process.env.JWT_SECRET,
    {
      expiresIn:'7d'
    }
  )
    res.status(200).json({
    userDetails:{
        mail:user.mail,
        username:user.username,
        token:token
    }
  })
    }catch(error){
      return res.status(500).send("Something went wrong , please try again");
    }
} 


module.exports=
    register;
