const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

//middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 8000;
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
    });

app.get('/', (req, res) => {
    res.send('backend api tester');
});
    
//server
app.listen(port, () => {
    console.log('server is running excellently')
});