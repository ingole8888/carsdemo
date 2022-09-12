const express=require("express")
const User=require("../models/user.model")
const app=express.Router()
const authMiddleware=require("../middleware/authMiddleware.middleware")

app.get("/",async(req,res)=>{
    let users=await User.find().limit(10)
    res.send(users)
})


app.get("/:id",async (req,res)=>{
    try {
        let user=await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete("/:id",authMiddleware,async(req,res)=>{
    try {
     await User.deleteOne({id:req.params.id})
     res.send("deleted success")
    } catch (error) {
     res.status(500).send(error.message)
    }
 })

app.post("/",async(req,res)=>{
    try {
        let newUser=await User.create(req.body)
        console.log(newUser._id)
        res.send({
            token:`${newUser._id}:${newUser.email}:${newUser.password}`,
            password:req.body.password
        })
    } catch (e) { 
        res.status(500).send(e.message)
    }    
})

module.exports=app;