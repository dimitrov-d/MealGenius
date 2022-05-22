const { db, router } = require('../index');

router.post('/user/currentUser', async (req, res) => {
    const { email } = req.body;
    const collection = db.collection('users');
    const user = await collection.findOne({ email });
    if (user == null) return res.status(400).send({ 'error': 'Cannot get current user' });
    return res.status(200).send(user);
});

router.post('/user/update', async (req, res) => {
    const { email, diet, allergens, shoppingList } = req.body;
    try {
        const collection = db.collection('users');
        const user = await collection.findOne({ email });

        const updateDoc = {
            $set: { diet, allergens, shoppingList },
        };

        const result = await collection.updateOne(user, updateDoc);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: 'Unsuccessful user update' });
    }
});

module.exports = router;
