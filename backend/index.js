const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const config = require('dotenv').config().parsed;
const client = new MongoClient(config.MONGO_DB_URL);
client.connect();
const db = client.db('Hackathon');

module.exports = { db, router };
