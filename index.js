import  express from "express"
import bodyparser from "body-parser";
import dotenv from "dotenv"
import mongoose from "mongoose";
import contactRouter from "./routes/Contact.js"

const app=express();
dotenv.config()
 const port=process.env.PORT||5000;
 app.listen(port,()=>{
   connectToDB()
    console.log(`Server is running on ${port}`)
 })


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use("/api",contactRouter)
// app.get("/",(req,res)=>{
//    res.json("hello world")
// })
const connectToDB=async()=>{
   try {
      mongoose.connect("mongodb://localhost:27017/mydatabase",{
      useNewUrlParser:true,
      useUnifiedTopology:true
   })
   console.log("Connected to DB...")
      
   } catch (error) {
      console.log(error);
      process.exit(1);
   }
}
