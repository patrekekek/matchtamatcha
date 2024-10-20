import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useDrinksContext } from '../hooks/useDrinksContext';
import { useOrdersContext } from '../hooks/useOrdersContext';
import useFetchDrinks from '../hooks/useFetchDrinks';
import { useNavigate } from 'react-router-dom';


//components
import SelectionDrink from '../components/SelectionDrink';



const Home = () => {
    const { user } = useAuthContext();
    const { drinks } = useDrinksContext();
    const { dispatch } = useOrdersContext();
    const { loading } = useFetchDrinks();
    const [selectedDrinks, setSelectedDrinks] = useState({});
    const navigate = useNavigate();

    console.log(drinks)
    console.log('selected drinks', selectedDrinks);

    const handleIncrement = (drinkId) => {
        const drink = drinks.find(d => d._id === drinkId);
        setSelectedDrinks((prev) => ({
            ...prev,
            [drinkId]: {
                ...prev[drinkId],
                quantity: (prev[drinkId]?.quantity || 0) + 1,
                name: drink.name
            }
        }));
    };

    const handleDecrement = (drinkId) => {
        const drink = drinks.find(d => d._id === drinkId);
        setSelectedDrinks((prev) => ({
            ...prev,
            [drinkId]: {
                ...prev[drinkId],
                quantity: Math.max((prev[drinkId]?.quantity || 0) - 1, 0),
                name: drink.name
            }
        }));
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;

        Object.keys(selectedDrinks).forEach(drinkId => {
            const drink = drinks.find(d => d._id === drinkId);
            const quantity = selectedDrinks[drinkId]?.quantity || 0;
            const price = drink.priceLarge;

            totalPrice += price * quantity;
        });

        return totalPrice;
    };

    const handleClick = () => {
        try {
            const validDrinks = Object.keys(selectedDrinks).filter(drinkId => selectedDrinks[drinkId]?.quantity > 0);
    
            if (validDrinks.length === 0) {
                console.error('No drinks selected');
                return;
            }
    
            const requestData = {
                drinks: validDrinks.map((drinkId) => ({
                    drink: drinkId,
                    quantity: selectedDrinks[drinkId].quantity,
                    name: selectedDrinks[drinkId].name
                })),
                user: user.id,
                totalPrice: calculateTotalPrice()
            };
    
            dispatch({ type: 'SET_ORDER', payload: requestData });

            setSelectedDrinks({});
            navigate('/checkout');
            
        } catch (error) {
            console.error('Failed to dispatch order:', error);
        }
    };
    
    
    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="drinks-container">
            <SelectionDrink
                title="Matcha Drinks"
                drinks={drinks.filter(drink => drink.category === "Matcha Drinks")}
                selectedDrinks={selectedDrinks}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
            />
            <SelectionDrink
                title="Berry Series"
                drinks={drinks.filter(drink => drink.category === "Berry Series")}
                selectedDrinks={selectedDrinks}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
            />
            <SelectionDrink
                title="Others"
                drinks={drinks.filter(drink => drink.category !== "Matcha Drinks" && drink.category !== "Berry Series")}
                selectedDrinks={selectedDrinks}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
            />
            <div className="order-summary-container">
                <div className="total-price">Total Price: {calculateTotalPrice()}</div>
                <button className="order-button" onClick={handleClick}>Order</button>
            </div>
        </div>
    );
};

export default Home;
