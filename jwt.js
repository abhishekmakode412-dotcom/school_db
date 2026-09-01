const jwt = require('jsonwebtoken') 
const dotenv = require("dotenv")
dotenv.config()
 const jwtauthmiddlewear=(req , res , next)=>{
      const token = req.headers.authorization.split(' ')[1];
      if(!token){
        return res.status(401).json({message:"unauthorized"})
      }
      try{
        const decode = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.jwtpayload = decode
        next()
      }catch(error){
          console.log(error)
          res.status(404).json({message:"not key found",
             error:error.message})
      }
}

const generatetoken =(userdata)=>{
      return jwt.sign(userdata , process.env.JWT_SECRET_KEY)
}
module.exports ={jwtauthmiddlewear , generatetoken}