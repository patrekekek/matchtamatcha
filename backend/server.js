// require('dotenv').config();

const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const drinkRoutes = require('./routes/drinks');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/user');

// express app
const app = express();

// env config
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });


// CORS setup
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));



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


const port = process.env.PORT || 4000;

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(port, () => {
        console.log('connected to db & listening on port', port);
})
    })
    .catch((error) => {
        console.log(error)
    })


