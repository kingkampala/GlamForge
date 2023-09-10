const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.json());

const api = process.env.PORT;

//database
const DB_URI = 'mongodb+srv://kampala:Kampala2810@cluster0.aixuzga.mongodb.net/?retryWrites=true&w=majority?ssl=true'

 mongoose
    .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
        dbName: 'a-p-i_db'
    })
    .then(() => {
        console.log('database connection successful');
    })
    .catch((err) => {
        console.error('database connection error', err);
    })
    
//server
const PORT = process.env.PORT || 2810;
app.listen(PORT, () => {
    console.log('server is running excellently!')
});