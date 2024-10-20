const express = require('express');
const {
    getDrinks,
    getDrink,
    updateAvailableDrinks
} = require('../controllers/drinkController');

//rbac middleware
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

// client routes

//get all drinks
router.get('/', getDrinks);


//search for a specific drink: by category
router.get('/:id', getDrink);


//update drinks (restricted to admin or owner)
router.put('/update', verifyToken, checkRole(['admin', 'owner']), updateAvailableDrinks);





module.exports = router;