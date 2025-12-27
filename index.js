let express = require("express");
let data = require("./MOCK_DATA.json")
let filesys= require("fs")
let app = express();
let PORT = 8500;

//userData in ul form
app.get("/userData",(req,res)=>{
   let result =data.map(userData => `<ul><li>${userData.first_name}</li></ul>`).join("")
   return res.send(result)
})

app.get("/api/userData",(req,res)=>{
   return res.json(data)
})

app.get("/userData/:idName",(req,res)=>{
   let userId = req.params.idName;
   let result= data.find(userEle => userEle.id === userId)
   return res.json(result)
})

//userSend the data
app.use(express.urlencoded({extended:false}))
app.post("/api/userData",(req,res)=>{
   let receiveData = req.body;
   console.log(receiveData)
   data.push({...receiveData, id:data.length+1});
   filesys.writeFile("./MOCK_DATA.json",JSON.stringify(data),(err,data)=>{
      return res.send("done");
   })
})

app.listen(PORT,()=>{
    console.log("Server has been started")
})