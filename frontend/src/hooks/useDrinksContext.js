import { DrinksContext } from '../context/DrinkContext';
import { useContext } from 'react';

export const useDrinksContext = () => {

    const context = useContext(DrinksContext);

    if (!context) {
        throw Error('useDrinksContext must be used inside the context provider')
    }

    return context;
}