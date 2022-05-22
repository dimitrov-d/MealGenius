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
    const { name, type } = req.body;
    const collection = db.collection('meals');

    collection.insertOne({
        name,
        type,
        ingredients: [{
            'quantity': '1',
            'name': 'Milk',
            'type': 'Condiments',
        }, {
            'quantity': '100 g',
            'name': 'Oatmeal',
            'type': 'Condiments'
        }],
    });

    res.status(200).send({ 'success': true });
});

module.exports = router;
