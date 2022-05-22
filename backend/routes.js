const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();
const config = require('dotenv').config().parsed;

const client = new MongoClient(config.MONGO_DB_URL);
client.connect();
const db = client.db('Cluster0');

router.post('/register', async (req, res) => {
    const { name, password, email, diets, allergens } = req.body;

    const collection = db.collection('users');
    const check_user = await collection.findOne({ email, password });
    if (check_user == null) {
        await collection.insertOne({ name, password, email, diets, allergens, meals });
        return res.status(200).send({ 'error': "Registration successfull" });
    } else {
        return res.status(400).send({ 'error': "User already exist", });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const db = client.db('Cluster0');
    const collection = db.collection('users');
    const user = await collection.findOne({ password, email });
    if (user == null) {
        return res.status(400).send({ 'error': "Wrong email or password" });
    }
    return res.status(200).send({ 'error': 0 });
});


router.get('/diets', async (req, res) => {
    db.collection("foodDiets").find({}).toArray((err, result) => {
        if (err) return res.status(400).send({ 'error': 1 });
        return res.status(200).send(result);

    });
});

router.get('/allergens', async (req, res) => {
    db.collection("allergens").find({}).toArray((err, result) => {
        if (err) return res.status(400).send({ 'error': 1 });
        return res.status(200).send(result);

    });
});


router.get('/meals', async (req, res) => {
    db.collection("meals").find({}).toArray((err, result) => {
        if (err) return res.status(400).send({ 'error': 1 });
        return res.status(200).send(result);

    });
});

router.post('/currentUser', async (req, res) => {
    const { email } = req.body;
    const collection = db.collection('users');
    const user = await collection.findOne({ email });
    if (user == null) {
        return res.status(400).send({ 'error': "Cannot get current user" });
    }
    return res.status(200).send(user);
});


router.post('/updateUser', async (req, res) => {
    const { email } = req.body;
    const newDiet = req.body.diet;
    const newAllergens = req.body.allergens;
    try {
        const collection = db.collection('users');
        const user = await collection.findOne({ email });

        const updateDoc = {
            $set: {
                diet: newDiet,
                allergens: newAllergens
            },
        };

        const result = await collection.updateOne(user, updateDoc);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: "Unsuccessful" });
    }

});

router.post('/updateMeal', async (req, res) => {
    const meal = req.body;
    
    try {
        const collection = db.collection('meals');
        const search_meal = await collection.findOne( {name:meal.name} );

        const updateMeal = {...meal, _id: undefined};
        delete updateMeal._id;
        const updateDoc = {
            $set: {
                ...updateMeal
            }
        };

        const result = await collection.updateOne(search_meal, updateDoc, {upsert: true});
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Unsuccessful meal update" });
    }

});




module.exports = { router };
