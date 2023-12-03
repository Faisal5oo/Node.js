
const { log } = require("console")
const fs =require("fs")

const path = require("path")
// fs.readFile(path.join(__dirname,'starter.txt'),"utf8",(err,data)=>{
//  if(err)throw err;
// console.log(data)

// })

fs.writeFile(path.join(__dirname,'starter.txt'),'hello world',(err)=>{
    if(err) throw err
    console.log('write is completed')

})
fs.mkdir('./new',(err)=>{

    if(err)throw err
    console.log('completed')

})