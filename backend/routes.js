const config = require('dotenv').config().parsed;
const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const diets = req.body.diets;
    const allergens = req.body.allergens;
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    const db = client.db('Cluster0');
    const collection = db.collection('users');
    const check_user = await collection.findOne({ email, password });
    if(check_user == null) {
        await collection.insertOne({ name , password, email, diets, allergens });
        res.status(200).send({'error':0});
    } else {
        res.status(400).send({'error':1});
    }
    
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    const db = client.db('Cluster0');
    const collection = db.collection('users');
    const user = await collection.findOne({ password, email });
    if(user == null) {
        res.status(400).send({'error':1});
    }
    res.status(200).send({'error':0});
});


router.get('/diets', async (req, res) => {
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    const db = client.db('Cluster0');
    
    db.collection("foodDiets").find({}).toArray(function(err, result) {
        if (err) return res.status(400).send({'error':1});
        return res.status(200).send(result);
    
      });
    });

    router.get('/allergens', async (req, res) => {
        const client = new MongoClient(config.MONGO_DB_URL);
        await client.connect();
        const db = client.db('Cluster0');
        
        db.collection("allergens").find({}).toArray(function(err, result) {
            if (err) return res.status(400).send({'error':1});
            return res.status(200).send(result);
        
          });
        });


        router.get('/meals', async (req, res) => {
            const client = new MongoClient(config.MONGO_DB_URL);
            await client.connect();
            const db = client.db('Cluster0');
            
            db.collection("meals").find({}).toArray(function(err, result) {
                if (err) return res.status(400).send({'error':1});
                return res.status(200).send(result);
            
              });
            });
    
    //if(foodDiets == null) res.status(400).send({});

    



module.exports = { router };
