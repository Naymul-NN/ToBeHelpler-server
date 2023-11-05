const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_KEY}@cluster0.4kfubsh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
     
    const serviceCollection = client.db('tobehelper').collection('homeservice');
    const allServiceCollection = client.db('tobehelper').collection('allServices');
  
    // get opatarion

    app.get('/homeservice', async(req, res) => {
        const result = await serviceCollection.find().toArray();
        res.send(result);
    })
    
    app.get('/allServices', async(req, res) => {
        const result = await allServiceCollection.find().toArray();
        res.send(result);
    })
    


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('make your house by our help')
})

app.listen(port, () =>{
    console.log(`help you to fix the house: ${port}`);
})