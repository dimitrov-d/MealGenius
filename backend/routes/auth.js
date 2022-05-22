const { db, router } = require('../index');
const jwt = require('jsonwebtoken');

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

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const data = {
        createdDate: Date.now(),
        // 10 hours from now
        expiryDate: Date.now() + 10 * 60 * 1000,
        ...user
    };

    const token = jwt.sign(data, jwtSecretKey);
    return res.status(200).send({ token });
});

router.get('/auth/validateToken', (req, res) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        const token = req.header('Authorization');

        const verified = jwt.verify(token, jwtSecretKey);
        return verified ? res.send({ success: true, message: 'Successfully Verified' })
            // Token expired
            : res.status(401).send({ 'error': 'Unauthorized' });
    } catch (error) {
        return res.status(401).send(error);
    }
});

module.exports = router;
