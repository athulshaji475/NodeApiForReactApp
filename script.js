
const express=require('express')
const dbcon=require('./dbconnection')
const dbconnection = require('./dbconnection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("views"))
app.use(cors())



app.get('/', async(req,res)=>{

  try {
    const data = await dbcon.dbconnection();
    console.log(Success);
    res.send(data);
  } catch (error) {
    console.log("Error while Connecting....." + error);
    res.send(error);
  }
   
})


app.get('/getdata',async(req,res)=>{
  try {
    const data=await dbcon.GetData()
    console.log(data.length)
    if (data.length>=0)
    {
    res.json(data)
    }
    else
    {
    res.status=404
    res.send("Erro 404...Data not found")
    }
  } catch (error) {
    console.log("Error while Connecting....." + error);
  res.send(error);

    
  }
})


app.post('/login',async(req,res)=>{
 
 const username=req.body.name
 console.log(username)
 const  password=req.body.password
 console.log(req.body)

 const data=await dbcon.CheckUser(username,password)
 res.json(data)


})

//
app.post('/register',async (req,res)=>{
try {
  const username=req.body.username
 const  password=req.body.password
 const name=req.body.name
 const  email=req.body.email
 const phone=req.body.phone

 console.log(req.body)
  
 const result=await dbcon.RegisterData(name,password,username,email,phone)
  //req.statusCode(200)
  res.send("Data inserted sucessfully")
} catch (error) {
  console.log(error)
 
}

},(error)=>{

})


const port=process.env.PORT||8080
app.listen(port,()=>{
  
    console.log(`server running on port ${port}`)
})