const mongoose = require('mongoose');

const Drink = require('../models/drinkModel');



const getDrinks = async (req, res) => {

    const drinks = await Drink.find();
    res.status(200).json(drinks);
}

const getDrink = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Drink unavailable.'});
    }

    const drink = await Drink.findById(id);

    if (!drink) {
        return res.status(404).json({ error: 'Drink unavailable.'})
    }
    res.status(200).json(drink);
}




const updateAvailableDrinks = async (req, res) => {

    // const drinksArray = req.body.drinks;

    try {
        const updatedDrinks = req.body;

        await Drink.deleteMany({});
        await Drink.insertMany(updatedDrinks);
        res.status(200).send('Drinks updated successfully')

    } catch (error) {
        res.status(400).send('Error replacing drink')
        // res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getDrinks,
    getDrink,
    updateAvailableDrinks
}