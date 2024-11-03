import { useState, useEffect } from 'react';
import { useDrinksContext } from '../hooks/useDrinksContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import useFetchDrinks from '../hooks/useFetchDrinks'


//components
// import DrinkListUpdate from '../components/DrinkListUpdate';

const UpdatedMenu = () => {
    const { user } = useAuthContext();
    const { drinks } = useDrinksContext();
    const { loading } = useFetchDrinks();
    const navigate = useNavigate();
    const [allDrinks, setAllDrinks] = useState([]);


    useEffect(() => {
        if (drinks) {
            setAllDrinks(drinks);
        }
    }, [drinks])

    console.log('allDrinks', allDrinks);



    const handleDrinkToggle = (id) => {
        setAllDrinks(prevState => (
            prevState.map(drink =>
                drink._id === id 
                ? { ...drink, isAvailable: !drink.isAvailable } 
                : drink
            )
        ))
    }

    const handleSubmit = () => {
        
        const updateDrinks = async (updatedDrinkList) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/matcha/drinks/update`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify(updatedDrinkList)
                });
                if (!response.ok) {
                    throw Error('Failed to update drinks');
                }
                console.log('Drinks updated successfully');
            } catch (error) {
                console.error(error);
            }
        }
        updateDrinks(allDrinks);
        navigate('/orderprocessing');
    }


    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="drink-selection-container">
            <h1>Select Available Drinks</h1>
            
            <div className="drink-category">
                <h2>Matcha Drinks</h2>
                {allDrinks && allDrinks
                    .filter(drink => drink.category === 'Matcha Drinks')
                    .map(drink => (
                        <div key={drink._id} className="drink-list-item">
                            <input 
                                type="checkbox" 
                                checked={drink.isAvailable} 
                                onChange={() => handleDrinkToggle(drink._id)} 
                            />
                            <span>{drink.name}</span>
                        </div>
                    ))}
            </div>
    
            <div className="drink-category">
                <h2>Berry Series</h2>
                {allDrinks && allDrinks
                    .filter(drink => drink.category === 'Berry Series')
                    .map(drink => (
                        <div key={drink._id} className="drink-list-item">
                            <input 
                                type="checkbox" 
                                checked={drink.isAvailable} 
                                onChange={() => handleDrinkToggle(drink._id)} 
                            />
                            <span>{drink.name}</span>
                        </div>
                    ))}
            </div>
    
            <div className="drink-category">
                <h2>Other Drinks</h2>
                {allDrinks && allDrinks
                    .filter(drink => drink.category === 'Others')
                    .map(drink => (
                        <div key={drink._id} className="drink-list-item">
                            <input 
                                type="checkbox" 
                                checked={drink.isAvailable} 
                                onChange={() => handleDrinkToggle(drink._id)} 
                            />
                            <span>{drink.name}</span>
                        </div>
                    ))}
            </div>
    
            <button className="button" onClick={handleSubmit}>These are available</button>
        </div>
    );
    
}

export default UpdatedMenu;

