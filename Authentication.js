const passport = require("passport")
const localstrategy = require("passport-local").Strategy
const Student = require("./Modules/Studentfile")

passport.use(new localstrategy( async (username , password , done)=>{
   try{
    console.log("receieved credienctial", username , password)
      const user = await Student.findOne({username:username})
      if(!user){
        return done(null, false, {message:"not found"})
      }
      const ispasswordmatch = user.password == password ? true : false
      if(ispasswordmatch){
        return done(null , user)
      }
   }catch(error){
     return done(error)
   }
})
)
module.exports = passport