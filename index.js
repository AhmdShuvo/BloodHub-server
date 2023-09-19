const { MongoClient, Admin } = require("mongodb");
const Objectid=require('mongodb').ObjectId;
const express=require('express');
const cors=require('cors');
require("dotenv").config();


const app=(express())





const port =process.env.PORT || 9000;


app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0qtlc.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://RideAndDrive-server:FRgSLMuoMbRVR1x2@cluster0.0qtlc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db('bloodHub');
    const donorsCollecton = database.collection('Donors');
    const ratingsCollection = database.collection('Ratings');
    // Query for a movie that has the title 'Back to the Future'


    app.post("/donors",async (req,res)=>{
      
      const user= req.body;
      const result=await donorsCollecton.insertOne(user);
  
    
        res.send(result)
    });

    app.get('/donors', async (req,res)=>{
      const donors= donorsCollecton.find({});
      const result= await donors.toArray()
      res.json(result);
    })
    app.get('/ratings', async(req,res)=>{
    const ratings=d=ratingsCollection.find({});
    const result= await ratings.toArray();
    res.json(result)
    })

    app.get("/user/:email",async(req,res)=>{
      const userEmail=req.params.email;
       
      const query = {email: userEmail};
      const cursor= donorsCollecton.find(query);
      const result=await cursor.toArray()
      res.json(result);
   })
  

   app.put('/donor/:id',async (req,res)=>{
    const id=req.params;
  
    const updateUser=req.body;
 
    const filter={_id: Objectid(id)}
    const options = { upsert: true };
    const updateDoc = {
     $set: {
       group: updateUser.group,
       address:updateUser.address,
       displayName:updateUser.username,
      
     },
   };
  
    const result= await donorsCollecton.updateOne(filter,updateDoc,options)
   })
      //  change pending to approved//
      app.put("/status/donor/:id",async(req,res)=>{
        const id=req.params.id;
    
       const filter={_id: Objectid(id)}
       console.log(id);
       const options = { upsert: true }; 
       const updateDoc = {
        $set: {
          status: "Active"
        },
        
      
      }
      const result= await donorsCollecton.updateOne(filter,updateDoc,options)
      res.send(result)
      
    })

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


 
  app.get('/',async(req,res)=>{
           
   res.send("server Running")
         

  })


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })