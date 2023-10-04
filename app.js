const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwtAuth = require('./auth/jwt');
const handleError = require('./auth/errhand');
const verifyToken = require('./auth/verify');

//middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(jwtAuth());
app.use(handleError);
app.use(verifyToken);

//env
const port = process.env.API_URI;
const DB_URI = process.env.MONGO_URI;

//routes
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const orderitemsRoutes = require('./routes/orderitems');
const ordersRoutes = require('./routes/orders');
const cartsRoutes = require('./routes/carts');
const paymentsRoutes = require('./routes/payments');

app.use(`${port}/users`, usersRoutes);
app.use(`${port}/categories`, categoriesRoutes);
app.use(`${port}/products`, productsRoutes);
app.use(`${port}/orderitems`, orderitemsRoutes);
app.use(`${port}/orders`, ordersRoutes);
app.use(`${port}/carts`, cartsRoutes);
app.use(`${port}/payments`, paymentsRoutes);

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