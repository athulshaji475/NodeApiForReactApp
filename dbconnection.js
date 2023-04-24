 var express = require('express');
 var sql = require("mssql");
 


//---------------------------------------
const dbconnection = async () => {
    // config for your database
    const config = {
      user: 'sa',
      password: 'init*123',
      server: 'DESKTOP-V403TQ4',
      database: 'Angular',
      PORT: 1433,
      encrypt: false
    };
  
    try {
     conresult=  await sql.connect(config);
      const result = await sql.query('select * from Employee');
      return result.recordset;
    } catch (error) {
      console.log("Error from Connection DB Page=>" + error);
      throw error;
    }
  };

  //------------------------------------

  const  GetData=async()=>{
    const config = {
        user: 'sa',
        password: 'init*123',
        server: 'DESKTOP-V403TQ4',
        database: 'Angular',
        PORT: 1433,
        encrypt: false
      };
    try {
        const pool=  await sql.connect(config);
         const result = await sql.query('select * from Employee');
         return result.recordset;
       } catch (error) {
         console.log("Error from Connection DB Page=>" + error);
         throw error;
       }
  }







  //Checks the Login------------------------------------------------\

const CheckUser=async(username,password)=>{

 
try {
    const config = {
        user: 'sa',
        password: 'init*123',
        server: 'DESKTOP-V403TQ4',
        database: 'Angular',
        PORT: 1433,
        encrypt: false
     
}
    
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, password)
      .query('SELECT * FROM Employee WHERE Username = @username AND Password = @password');
      console.log(result.recordset)
      return result.recordset
      sql.close();
} 
catch (error) {
    console.log("Error from Login ConneSction=>" + error);
    throw error;
    
}


  }


  //----------new register part------------------


 const RegisterData= async(name,password,username,email,phone)=>{

    try {
      const config = {
        user: 'sa',
        password: 'init*123',
        server: 'DESKTOP-V403TQ4',
        database: 'Angular',
        PORT: 1433,
        encrypt: false
     
}





const pool=await sql.connect(config)
const result=await pool
.request()
.input('name', sql.NVarChar(50),name)
.input('email',sql.NVarChar(50),email)
.input('phone',sql.NVarChar(10),phone)
.input('username',sql.NVarChar(50),username)
.input('password', sql.NVarChar(50), password)
.input('status',sql.Int,1)
.input('type',sql.Int,1)
.query('insert into employee(Name,Email,Phone,UserName,Password,Status,type) values(@name,@email,@phone,@username,@password,@status,@type)')


 

 console.log("Data inserted")


    } catch (error) {
      console.log("Error while inserting=>"+error)
    }

  }
  
  module.exports=
{
    dbconnection,
    GetData,
    CheckUser,
    RegisterData
    
    
}