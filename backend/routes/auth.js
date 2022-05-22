const { db, router } = require('../index');

router.post('/auth/register', async (req, res) => {
    const { name, password, email, diet, allergens } = req.body;

    const collection = db.collection('users');
    const check_user = await collection.findOne({ email, password });
    if (check_user == null) {
        await collection.insertOne({ name, password, email, diet, allergens });
        return res.status(200).send({ 'error': 'Registration successfull' });
    } else {
        return res.status(400).send({ 'error': 'User already exists', });
    }
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const collection = db.collection('users');
    const user = await collection.findOne({ password, email });
    if (user == null) {
        return res.status(400).send({ 'error': 'Wrong email or password' });
    }
    return res.status(200).send({ user });
});

module.exports = router;
