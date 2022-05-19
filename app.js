const express = require('express')
const app = express()
const port = 3000
const { MongoClient } = require('mongodb');

app.post('/addNew', async (req, res) => {
    const name = "Damjan";
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('Cluster0');
    const collection = db.collection('newCollection');
    await collection.insertOne({ name });

    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
console.log(process.env.MONGO_DB);
const url = 'mongodb+srv://hackathon:hackathon_admin@cluster0.wjyl3.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'Cluster0';

async function main() {
    // Use connect method to connect to the server


    // the following code examples can be pasted here...

    return 'done.';
}

// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());