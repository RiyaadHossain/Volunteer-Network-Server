const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://riyad:${process.env.PASS}@volunteernetwork.cpddi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  await client.connect();
  const volunteerCollection = client.db("VolunteerDB").collection("Volunteer");
  try {
    // 1. GET API
    app.get("/volunteers", async (req, res) => {
      const query = req.query;
      const cursor = volunteerCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // 2. POST API
    app.post("/volunteer", async (req, res) => {
      const data = req.body;
      const result = await volunteerCollection.insertOne(data);
      res.send(result);
    });

    // 3. UPDATE API
    app.put("/volunteer/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: data.name,
          image: data.image,
        },
      };
      const result = await volunteerCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // 4. DELETE API
    app.delete("/volunteer/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await volunteerCollection.deleteOne(filter);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
