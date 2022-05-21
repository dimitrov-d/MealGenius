const config = require('dotenv').config().parsed;
const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();


router.post('/addNew', async (req, res) => {
    const name = req.body.name;
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('Cluster0');
    const collection = db.collection('newCollection');
    await collection.insertOne({ name });

    res.send('Success!')
});

router.post('/register', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const categories = req.body.categories;
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db('Cluster0');
    const collection = db.collection('users');
    await collection.insertOne({ name , password, email, categories });

    res.send('Success!')
});

module.exports = { router };
