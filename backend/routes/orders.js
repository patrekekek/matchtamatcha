const express = require('express');
const {
    getOrders,
    getOrder,
    orderDrinks,
    updateOrder
} = require('../controllers/orderController');


//rbac middleware
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();


//get order drinks
router.get('/', verifyToken, getOrders);


//get specific order 
router.get('/:userId', verifyToken, getOrder);


//order drinks
router.put('/', verifyToken, orderDrinks);


//update order
router.patch('/:id', updateOrder);

module.exports = router;