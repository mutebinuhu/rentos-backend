const express = require('express');
const cors = require('cors');

require('dotenv').config();
const db = require('./database/db');
db();
const app = express();
app.use(express.json());
app.use(cors());
const  propertyController = require('./controllers/propertyController') 
app.use('/api/properties', propertyController)

module.exports = app;

