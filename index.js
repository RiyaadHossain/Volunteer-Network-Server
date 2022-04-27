const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require('cors');
require("dotenv").config();
const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://riyad:${process.env.PASS}@volunteernetwork.cpddi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  await client.connect()
  const volunteerCollection = client.db('VolunteerDB').collection('Volunteer')

  // 1. GET API
  app.get('/volunteers', async (req, res) => {
    const query = req.query
    const cursor = volunteerCollection.find(query)
    const result = await cursor.toArray()
    res.send(result)
  })

  // 2. POST API
  app.get('/volunteer', async (req, res) => {
    const data = req.body
    const result = await volunteerCollection.insertOne(data)
    res.send(result)
  })

  // 3. DELETE API
  

  // 4. UPDATE API

  try {
    
  }
  finally{}
}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})