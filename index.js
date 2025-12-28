let fileSys = require("fs")
let express = require("express");
let data = require("./MOCK_DATA.json")
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
   let userId = Number(req.params.idName);
   let result= data.find(userEle => userEle.id === userId)
   return res.json(result)
})

//userSend the data
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.post("/api/userData",(req,res)=>{
   let receiveData = req.body;
   console.log(receiveData)
   data.push({...receiveData, id:data.length+1});
   fileSys.writeFile("./MOCK_DATA.json",JSON.stringify(data),(err,data)=>{
      return res.send("done");
   })
})

// patch request
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.patch("/api/userData/:id",(req,res)=>{
   let patchId=Number(req.params.id);
   // let modify =data.find(ele =>  ele.id===patchId)
   // modify.first_name = req.body.first_name;
   // modify.last_name = req.body.first_name;
   data.forEach(element => {
      if(element.id === patchId){
         element.first_name =req.body.first_name;
         element.last_name =req.body.last_name;
      }
   }
)
fileSys.writeFile("./MOCK_DATA.json",JSON.stringify(data),()=>{})
console.log(data)
return res.send("done")
})

// delete
app.delete("/api/userData/:id",(req,res)=>{
   let patchId=Number(req.params.id);
   console.log(patchId)
   data.forEach(element =>{
   if(element.id === patchId){
      data.splice(patchId-1,patchId);
      fileSys.writeFile("./MOCK_DATA.json",JSON.stringify(data),()=>{})
   }
   })
})

app.listen(PORT,()=>{
    console.log("Server has been started")
})