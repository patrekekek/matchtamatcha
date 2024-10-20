const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    priceSmall: {
        type: Number,
        required: true
    },
    priceLarge: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Drink', drinkSchema);


