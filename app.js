const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
const config = require('dotenv').config().parsed;
const { MongoClient } = require('mongodb');

app.post('/addNew', async (req, res) => {
    const name = req.body.name;
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('Cluster0');
    const collection = db.collection('newCollection');
    await collection.insertOne({ name });

    res.send('Success!')
});

app.listen(3000, () => console.log(`Hackathon app listening on port 3000`));
