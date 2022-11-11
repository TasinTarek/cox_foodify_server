const express = require("express");
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, MongoRuntimeError } = require("mongodb");
require('dotenv').config()
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zuq0hze.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
try{
    await client.connect();
    const dishesCollection = client.db('cox_foodify').collection('dishes')

    app.get('/dish', async(req, res)=>{
        const query = {};
        const cursor = dishesCollection.find(query);
        const dishes = await cursor.toArray();

        res.send(dishes);
    })
}
finally{
console.log("Final")
}
}
run().catch(console.dir)





app.get("/dishes", (req, res) => {
  res.send("Hello Cox FOodify!");
});

app.listen(port, () => {
  console.log(`Cox Foodify listening on port ${port}`);
});
