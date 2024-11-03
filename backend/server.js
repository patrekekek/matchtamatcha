// require('dotenv').config();

const dotenv = require('dotenv');

const express = require('express');
const mongoose = require('mongoose');
const drinkRoutes = require('./routes/drinks');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');

// express app
const app = express();

// env config
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// middleware
app.use(express.json()); 

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


// routes
app.use('/matcha/drinks', drinkRoutes);
app.use('/matcha/orders', orderRoutes);
app.use('/matcha/user', userRoutes);


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })


