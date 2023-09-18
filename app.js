const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
dotenv.config();
app.use(bodyParser.json());
app.use(morgan('tiny'));

//env
const port = process.env.API_URI;
const DB_URI = process.env.MONGO_URI;

//routes
const usersRoutes = require('./routes/users');

//app.use(`${port}/total`, usersRoutes);
app.use(`${port}/users`, usersRoutes);

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
    
//server
app.listen(8000, () => {
    console.log('server is running excellently')
});