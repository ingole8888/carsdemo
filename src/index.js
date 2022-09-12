const express=require("express")
const dbConnect=require("./config/db")
const userRouter=require("./routes/user.route")
const taskRouter=require("./routes/task.route")

let PORT=8090;
const app=express()

app.use(express.json())
app.use("/users",userRouter)
app.use("/tasks",taskRouter)


app.listen(PORT,async()=>{
    await dbConnect()
    console.log(`listening at http://localhost:${PORT}`);
})