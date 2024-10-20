// import { useState, useEffect } from 'react';
// import { useDrinksContext } from '../hooks/useDrinksContext';
// import { useAuthContext } from '../hooks/useAuthContext';

// //components
// import DrinkListUpdate from '../components/DrinkListUpdate';

// //here needs to use the useFetchDrink hook

// const UpdatedMenu = () => {
//     const { dispatch } = useDrinksContext();
//     const { user } = useAuthContext();
//     const [matchaDrinks, setMatchaDrinks] = useState([]);
//     const [berrySeriesDrinks, setBerrySeriesDrinks] = useState([]);
//     const [otherDrinks, setOtherDrinks] = useState([]);

//     const [loading, setLoading] = useState(true);
//     const [checkedDrinks, setCheckedDrinks] = useState({});



//     useEffect(() => {
//         const fetchDrinks = async () => {
//             try {
//                 const response = await fetch('/matcha/drinks');
//                 const json = await response.json();
    
//                 if (response.ok) {
//                     dispatch({ type: 'SET_DRINKS', payload: json });
//                     categorizeDrinks(json);
//                     initializeCheckedDrinks(json);
//                 } else {
//                     console.error("Failed to fetch drinks");
//                 }
//             } catch (error) {
//                 console.error("Error fetching drinks", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchDrinks();
//     }, [dispatch])

//     const categorizeDrinks = (drinks) => {
//         // const availableDrinks = drinks.filter(drink => drink.isAvailable);

//         const matcha = drinks.filter(drink => drink.category === "Matcha Drinks");
//         const berrySeries = drinks.filter(drink => drink.category === "Berry Series");
//         const others = drinks.filter(drink => drink.category !== "Matcha Drinks" && drink.category !== "Berry Series");

//         setMatchaDrinks(matcha);
//         setBerrySeriesDrinks(berrySeries);
//         setOtherDrinks(others);
//     }

    
//     const initializeCheckedDrinks = (drinks) => {
//         const initialCheckedDrinks = {};
//         const drinkList = [...matchaDrinks, ...berrySeriesDrinks, ...otherDrinks];
//         drinkList.forEach(drink => {
//             initialCheckedDrinks[drink.name] = drink.isAvailable;
//         });
//         setCheckedDrinks(initialCheckedDrinks);
//     }



//     const handleDrinkToggle = (name) => {
//         setCheckedDrinks(prevState => ({
//             ...prevState,
//             [name]: !prevState[name]
//         }))
//     }

//     useEffect(() => {
//         const updatedDrinksAvailability = (drinks) => {
//             return drinks.map(drink => ({
//                 ...drink,
//                 isAvailable: checkedDrinks[drink.name] || false
//             }))
//         }

//         setMatchaDrinks(prevState => updatedDrinksAvailability(prevState));
//         setBerrySeriesDrinks(prevState => updatedDrinksAvailability(prevState));
//         setOtherDrinks(prevState => updatedDrinksAvailability(prevState));


//     }, [checkedDrinks])

//     // problem with initial state kanang null una ang result
//     // console.log('matchad drinks', matchaDrinks[0].isAvailable);

//     const handleSubmit = () => {
//         const finalUpdatedDrinkList = [...matchaDrinks, ...berrySeriesDrinks, ...otherDrinks];

//         const updateDrinks = async (updatedDrinkList) => {
//             try {
//                 const response = await fetch('/matcha/drinks/update', {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${user.token}`
//                     },
//                     body: JSON.stringify(updatedDrinkList)
//                 });
//                 if (!response.ok) {
//                     throw Error('Failed to update drinks');
//                 }
//                 console.log('Drinks updated successfully');
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         updateDrinks(finalUpdatedDrinkList);       
//     }


//     if (loading) {
//         return <div>Loading...</div>
//     }

//     return (
//         <div>
//             <h1>Select Available Drinks</h1>
//             <h2>Matcha Drinks</h2>
//             {matchaDrinks.map(drink => (
//                 <DrinkListUpdate
//                     key={drink._id}
//                     name={drink.name}
//                     checked={drink.isAvailable}
//                     onChange={() => handleDrinkToggle(drink.name)}
//                 />
//             ))}

//             <h2>Berry Series</h2>
//             {berrySeriesDrinks.map(drink => (
//                 <DrinkListUpdate
//                     key={drink._id}
//                     name={drink.name}
//                     checked={drink.isAvailable}
//                     onChange={() => handleDrinkToggle(drink.name)}
//                 />
//             ))}

//             <h2>Others Drinks</h2>
//             {otherDrinks.map(drink => (
//                 <DrinkListUpdate
//                     key={drink._id}
//                     name={drink.name}
//                     checked={drink.isAvailable}
//                     onChange={() => handleDrinkToggle(drink.name)}
//                 />
//             ))}

//             <button className="button" onClick={handleSubmit}>These are available</button>
//         </div>
//     )
// }

// export default UpdatedMenu;.




//fetch hook
// import { useState, useEffect, useCallback } from 'react';
// import { useDrinksContext } from './useDrinksContext';

// const useFetchDrinks = () => {
//     const { dispatch } = useDrinksContext();
//     const [matchaDrinks, setMatchaDrinks] = useState([]);
//     const [berrySeriesDrinks, setBerrySeriesDrinks] = useState([]);
//     const [otherDrinks, setOtherDrinks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [checkedDrinks, setCheckedDrinks] = useState({});


//     const categorizeDrinks = useCallback((drinks) => {
//         const availableDrinks = drinks.filter(drink => drink.isAvailable);

//         const matcha = availableDrinks.filter(drink => drink.category === "Matcha Drinks");
//         const berrySeries = availableDrinks.filter(drink => drink.category === "Berry Series");
//         const others = availableDrinks.filter(drink => drink.category !== "Matcha Drinks" && drink.category !== "Berry Series");

//         setMatchaDrinks(matcha);
//         setBerrySeriesDrinks(berrySeries);
//         setOtherDrinks(others);
//     }, []);

//     const initializeCheckedDrinks = useCallback((drinks) => {
//         const initialCheckedDrinks = {};

//         drinks.forEach(drink => {
//             initialCheckedDrinks[drink.name] = drink.isAvailable;
//         });
//         setCheckedDrinks(initialCheckedDrinks);
//     }, []);

//     useEffect(() => {
//         const fetchDrinks = async () => {
//             try {
//                 const response = await fetch('/matcha/drinks');
//                 const json = await response.json();

//                 if (response.ok) {
//                     dispatch({ type: 'SET_DRINKS', payload: json })
//                     categorizeDrinks(json);
//                     initializeCheckedDrinks(json);
//                 } else {
//                     console.error("Failed to fetch drinks");
//                 }
//             } catch(error) {
//                 console.error("Error fetching drinks", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchDrinks();
//     }, [dispatch, categorizeDrinks, initializeCheckedDrinks]);



//     return { matchaDrinks, berrySeriesDrinks, otherDrinks, loading, checkedDrinks };

// }

// export default useFetchDrinks;













// const handleSubmit = () => {
//     const requestData = {
//         drinks: Object.keys(selectedDrinks).map((drinkId) => ({
//             drink: drinkId,
//             quantity: selectedDrinks[drinkId]?.quantity
//         })),
//         user: user.id,
//         totalPrice: calculateTotalPrice()
//     };
    
//     const sendOrder = async (requestData) => {
//         try {
//             const response = await fetch('/matcha/drinks/orders', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${user.token}`
//                 },
//                 body: JSON.stringify(requestData)
//             });

//             if (!response.ok) {

//                 const errorResponse = await response.json();
//                 console.error('Error response:', errorResponse);
//                 throw new Error('Failed to order Drinks');
//             }

//             const json = await response.json();
//             console.log('Drinks ordered successfully:', json);


//             dispatch({ type: 'SET_ORDER', payload: json.drinks });

//         } catch (error) {
//             console.error('Error while ordering drinks:', error);
//         }
//     };

//     sendOrder(requestData);
// };


// const mongoose = require('mongoose');

// const Order = require('../models/orderModel');
// const Drink = require('../models/drinkModel');



// const getDrinks = async (req, res) => {

//     const drinks = await Drink.find();
//     res.status(200).json(drinks);
// }

// const getDrink = async (req, res) => {
//     const { id } = req.params;

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'Drink unavailable.'});
//     }

//     const drink = await Drink.findById(id);

//     if (!drink) {
//         return res.status(404).json({ error: 'Drink unavailable.'})
//     }
//     res.status(200).json(drink);
// }


// const getOrder = async (req, res) => {

//     try {
//         const userId = req.user._id;
//         const orders = await Order.find({ user: userId })
//             .populate({
//                 path: 'drinks.drink',
//                 select: 'name priceLarge'
//             })
//             .exec();

//         res.status(200).json(orders);
//     } catch (error) {
//         console.error('Error fetching orders:', error)
//         res.status(500).json({ error: 'Order unavailable'})
//     }

// }



// const orderDrinks = async (req, res) => {
//     //code needs to be revised: validation

//     const {drinks, user, totalPrice} = req.body;

//     try {
//         const exists = await Order.findOne({ user: user, status: 'pending' });

//         if (exists) {
//             return res.status(409).json({ error: 'You already have a pending order'});
//         }


//         const order = await Order.create({ drinks, user, totalPrice });

//         const populatedOrder = await Order.findById(order._id)
//             .populate({
//                 path: 'drinks.drink',
//                 select: 'name'
//             })
//             .populate({
//                 path: 'user',
//                 select: 'email'
//         });
    

//         res.status(200).json(populatedOrder);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }

// }






// const updateAvailableDrinks = async (req, res) => {

//     // const drinksArray = req.body.drinks;

//     try {
//         const updatedDrinks = req.body;

//         await Drink.deleteMany({});
//         await Drink.insertMany(updatedDrinks);
//         res.status(200).send('Drinks updated successfully')

//     } catch (error) {
//         res.status(400).send('Error replacing drink')
//         // res.status(400).json({ error: error.message });
//     }
// }

// module.exports = {
//     getDrinks,
//     getDrink,
//     getOrder,
//     orderDrinks,
//     updateAvailableDrinks
// }