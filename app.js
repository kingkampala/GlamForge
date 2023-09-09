const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.json());

//server
const PORT = process.env.port || 2810;
app.listen(PORT, () => {
    console.log('server is running excently!')
})