const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

//middlewares
app.use(cors());
app.use(express.json());
dotenv.config();

const api = process.env.PORT;
const DB_URI = process.env.MONGO_URI;

//database
mongoose
    .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'a-p-i_db'
    })
    .then(() => {
        console.log('database connection successful');
    })
    .catch((err) => {
        console.error('database connection error', err);
    })
    
//server
app.listen(2810, () => {
    console.log('server is running excellently!')
});