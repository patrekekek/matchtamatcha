const mongoose = require('mongoose');

const Order = require('../models/orderModel');



const getOrders = async (req, res) => {

    try {
        const orders = await Order.find()
            .populate({
                path: 'drinks.drink',
                select: 'name priceLarge'
            })
            .exec();

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error)
        res.status(500).json({ error: 'Order unavailable'})
    }
}


const getOrder = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'Invalid user ID' });
    }

    try {
        // const order = await Order.findOne({ user: mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });

        const order = await Order.findOne({ user: userId })
            .populate({
                path: 'drinks.drink',
                select: 'name'
            })

        if (!order || order.length === 0) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong while fetching your order' });
    }
};



const orderDrinks = async (req, res) => {
    //code needs to be revised: validation

    const {drinks, user, totalPrice} = req.body;

    try {
        const exists = await Order.findOne({ user: user, status: 'pending' });

        if (exists) {
            return res.status(409).json({ error: 'You already have a pending order'});
        }


        const order = await Order.create({ drinks, user, totalPrice });

        const populatedOrder = await Order.findById(order._id)
            .populate({
                path: 'drinks.drink',
                select: 'name'
            })
            .populate({
                path: 'user',
                select: 'email'
        });
    

        res.status(200).json(populatedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


const updateOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such order'});
    }

    const updatedOrder = await Order.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
    ).populate('drinks.drink');

    if(!updatedOrder) {
        return res.status(400).json({ error: 'No such order'});
    }

    res.status(200).json(updatedOrder);

}


const deleteOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such order' });
    }

    const order = await Order.findOneAndDelete({ _id: id });

    if (!order) {
        return res.status(404).json({ error: 'No such order' })
    }

    res.status(200).json(order);

}




module.exports = {
    getOrders,
    getOrder,
    orderDrinks,
    updateOrder,
    deleteOrder
}