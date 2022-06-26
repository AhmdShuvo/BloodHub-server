const { MongoClient, Admin } = require("mongodb");
const Objectid=require('mongodb').ObjectId;
const express=require('express');
const cors=require('cors');
require("dotenv").config();


const app=(express())





const port =process.env.PORT || 9000;


app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://RideAndDrive-server:FRgSLMuoMbRVR1x2@cluster0.0qtlc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      console.log("Connected");
    } finally {
        // Ensures that the client will close when you finish/error
      //   await client.close();
      }
    }

    run().catch(console.dir);


 
  app.get('/',async(req,res)=>{
           
   res.send("server Running")
         

  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })