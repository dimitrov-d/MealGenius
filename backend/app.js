const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const mealsRouter = require('./routes/meals');
const userRouter = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: '*', // TODO: conditional based on environment
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

app.use(authRouter);
app.use(mealsRouter);
app.use(userRouter);

app.listen(3000, () => console.info('Hackathon app listening on port 3000'));

module.exports = { app };
