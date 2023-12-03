const express=require("express")
 
const path=require("path")

const router=express.Router()

router.get("^/$|/default.html",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","subdir","default.html"))
})

router.get("/test.html",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","views","subdir","test.html"))
})