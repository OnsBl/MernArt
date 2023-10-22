var jwt = require('jsonwebtoken');


const Users = require("../models/UserSchema")

const isAuth=async(req,res,next)=>{

    if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){

     return res.status(401).json({message:"token is required"})
    }


    const token=req.headers.authorization.split(' ')[1] // Bearer|token

    if(!token){
        return res.status(401).json({message:"token is missing"})
    }
    
    try {
        const decode=jwt.verify(token,'123456')
        if(!decode) res.status(401).json({message:"token is invalid"})

        const user=await Users.findOne({_id:decode.id})
    
        if(!user)
        res.status(401).json({message:"user not registered"})
    
    
        req.user={
            _id:user._id,
            name:user.name,
            email:user.email,
    
    
        }
         

    } catch (error) {

        throw new Error("Invalid token")
        
    }

 
    next()





}


module.exports=isAuth