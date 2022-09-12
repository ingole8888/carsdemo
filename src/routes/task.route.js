const express=require("express")
const Task=require("../models/task.model")
const authMiddleware=require("../middleware/authMiddleware.middleware")

const app=express.Router()
app.use(authMiddleware)

app.get("/",async(req,res)=>{
    let token=req.headers.token;
    let id=token.split(":")[0]
try{
let items=await Task.find({
    author:id
})
res.send(items)
}
catch(e){
    res.status(500).send(e.message)
}
})

app.get("/:id",async(req,res)=>{
try{
let item=await Task.findById(req.params.id)
res.send(item)
}
catch(e){
    res.status(500).send(e.message)
}
})

app.delete("/:id",async(req,res)=>{
    try {
     await Task.deleteOne({id:req.params.id})
     res.send("deleted success")
    } catch (error) {
     res.status(500).send(error.message)
    }
 })

 app.patch("/:id",async(req,res)=>{
try {
    let change=await Task.findByIdAndUpdate(req.params.id,{isComplete:true})
    res.send("updated")
} catch (error) {
    res.status(500)
}
 })

app.post("/",async(req,res)=>{
    let token=req.headers.token;
    let id=token.split(":")[0]
    let task=await Task.create({
        ...req.body,
        author:id
    })
    res.send(task)
})

module.exports=app;