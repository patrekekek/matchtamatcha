import { useState, useEffect, /*useCallback*/ } from 'react';
import { useDrinksContext } from './useDrinksContext';

const useFetchDrinks = () => {
    const { dispatch } = useDrinksContext();
    // const [matchaDrinks, setMatchaDrinks] = useState([]);
    // const [berrySeriesDrinks, setBerrySeriesDrinks] = useState([]);
    // const [otherDrinks, setOtherDrinks] = useState([]);
    const [loading, setLoading] = useState(true);


    // this function might be redudant
    // const categorizeDrinks = useCallback((drinks) => {

    //     const matcha = drinks.filter(drink => drink.category === "Matcha Drinks");
    //     const berrySeries = drinks.filter(drink => drink.category === "Berry Series");
    //     const others = drinks.filter(drink => drink.category !== "Matcha Drinks" && drink.category !== "Berry Series");

    //     setMatchaDrinks(matcha);
    //     setBerrySeriesDrinks(berrySeries);
    //     setOtherDrinks(others);
    // }, []);


    useEffect(() => {
        console.log('API URL:', process.env.REACT_APP_API_URL);
        const fetchDrinks = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/matcha/drinks`);
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_DRINKS', payload: json })
                    // categorizeDrinks(json);
                } else {
                    console.error("Failed to fetch drinks");
                }
            } catch(error) {
                console.error("Error fetching drinks", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDrinks();
    }, [dispatch, /*categorizeDrinks*/]);



    return { /*matchaDrinks, berrySeriesDrinks, otherDrinks,*/ loading };

}

export default useFetchDrinks;