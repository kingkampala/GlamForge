const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwtAuth = require('./wares/jwt');
const handleError = require('./wares/errhand');
const verifyToken = require('./wares/verify');

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
const port = process.env.PORT || 8000;
const DB_URI = process.env.MONGO_URI;

//routes
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const orderitemsRoutes = require('./routes/orderitems');
const ordersRoutes = require('./routes/orders');
const cartsRoutes = require('./routes/carts');
const paymentsRoutes = require('./routes/payments');

app.use(`/users`, usersRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/products`, productsRoutes);
app.use(`/orderitems`, orderitemsRoutes);
app.use(`/orders`, ordersRoutes);
app.use(`/carts`, cartsRoutes);
app.use(`/payments`, paymentsRoutes);

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
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});