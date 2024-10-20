const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const orderItemSchema = new Schema ({
    drink: {
        type: Schema.Types.ObjectId,
        ref: 'Drink',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}, { _id: false });


const orderSchema = new Schema({
    drinks: [orderItemSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'beingDelivered', 'delivered'],
        default: 'pending',
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);
