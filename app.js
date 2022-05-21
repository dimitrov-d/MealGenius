const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const { router } = require('./routes');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);


app.listen(3000, () => console.log(`Hackathon app listening on port 3000`));

module.exports = { app };