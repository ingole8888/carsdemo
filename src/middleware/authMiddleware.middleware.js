const User=require("../models/user.model")
const authMiddleware=async (req,res,next)=>{
    let token=req.headers.token;
    if(token){
        let [id,email,password]=token.split(":")
        let user=await User.findById(id)
    
        if(user.email===email && user.password===password){
            req.userId=id;
            next()
        }
        else{
            res
            .status(401)
            .send("cannot perform this operation missing permission")
        }
    }
    else{
        res.status(401).send("cannot perform this operation missing permission")
    }
}

module.exports=authMiddleware
