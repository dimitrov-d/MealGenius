const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(3000, () => console.log(`Hackathon app listening on port 3000`));

module.exports = app;