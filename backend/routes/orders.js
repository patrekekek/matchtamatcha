const express = require('express');
const {
    getOrders,
    getOrder,
    orderDrinks,
    updateOrder,
    deleteOrder
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
router.patch('/:id', verifyToken, updateOrder);


//delete order
router.delete('/:id', verifyToken, deleteOrder);

module.exports = router;