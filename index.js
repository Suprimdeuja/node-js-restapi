let express = require("express");
let data = require("./MOCK_DATA.json")
let app = express();
let PORT = 8500;

app.get("/api/userData",(req,res)=>{
   return res.json(data)
})

app.get("/api/userData/:idName",(req,res)=>{
   let userId = req.params.idName;
   let result= data.find(userEle => userEle.id === userId)
   return res.json(result)
})

app.listen(PORT,()=>{
    console.log("Server has been started")
})