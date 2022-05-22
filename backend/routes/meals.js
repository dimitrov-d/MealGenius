const { ObjectId } = require('mongodb');
const { db, router } = require('../index');

// Can be diets, allergens, shopping-list or meals
router.get('/collections/:collection', async (req, res) => {
    const collection = req.params.collection;
    if (!collection) return res.status(400).send('No collection specified');

    db.collection(collection).find({}).toArray((err, result) => {
        if (err) return res.status(400).send({ 'error': `An error occured while getting the ${collection}s` });
        return res.status(200).send(result);
    });
});

router.post('/meals/update', async (req, res) => {
    const meal = req.body;
    if (!meal) return res.status(400).send({ 'error': 'No meal provided' });

    try {
        const collection = db.collection('meals');
        const search_meal = await collection.findOne({ _id: new ObjectId(meal._id) });
        const updateMeal = { ...meal, _id: undefined };
        delete updateMeal._id;
        const updateDoc = {
            $set: {
                ...updateMeal
            }
        };

        const result = await collection.updateOne(search_meal, updateDoc, { upsert: true });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Unsuccessful meal update' });
    }
});

router.post('/meals/delete', async (req, res) => {
    const { _id } = req.body;
    if (!_id) return res.status(400).send({ 'error': 'No meal ID provided!' });

    try {
        const collection = db.collection('meals');
        const search_meal = await collection.findOne({ _id: new ObjectId(_id) });

        const result = await collection.deleteOne(search_meal);
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Unsuccessful meal delete!' });
    }
});

// Mark all meals as unchecked
router.post('/meals/clearAll', async (req, res) => {
    const collection = db.collection('meals');
    await collection.find({}).toArray(async (err, results) => {
        if (err) return res.status(400).send({ 'error': 1 });

        for (const meal of results) {
            const dbMeal = collection.findOne({ _id: meal._id });
            meal.ingredients.forEach((ing) => ing.checked = false);

            const updateDoc = {
                $set: {
                    ingredients: meal.ingredients
                }
            };
            await collection.updateOne(dbMeal, updateDoc, { upsert: true });
        }
    });
    // collection.updateMany(meals, updateDoc);

    res.status(200).send({ 'success': true });
});

router.post('/meals/add', async (req, res) => {
    const {name,type} = req.body;
    const collection = db.collection('meals');
    
    collection.insertOne({name,type,ingredients:[{
        "quantity": "10 g",
        "name": "olive oil",
        "type": "Condiments",
      },{
        "quantity": "10 g",
        "name": "Kosher salt",
        "type": "Condiments"
      }],imageURL:"data:image/png;base64,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"});

    res.status(200).send({ 'success': true });
});

module.exports = router;
