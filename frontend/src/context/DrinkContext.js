import { createContext, useReducer } from 'react';

export const DrinksContext = createContext();

//reducer function
export const drinksReducer = (state, action) => {

    switch(action.type) {
        case 'SET_DRINKS':
            return {
                drinks: action.payload
            }

        //haven't made the routes yet
        // case 'CREATE_DRINKS':
        //     return {
        //         drinks: [action.payload, ...state.drinks]
        //     }
        // case 'DELETE_DRINKS':
        //     return {
        //         drinks: state.drinks.filter((drink) => drink._id !== action.payload._id)
        //     }
        
        case 'UPDATE_DRINKS':
            return {
                drinks: state.drinks.map((drink) => drink._id === action.payload._id ? action.payload : drink)
            }
        default:
            return state;
    }
}

export const DrinksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(drinksReducer, {
        drinks: []
    });

    return (
        <DrinksContext.Provider value={{...state, dispatch}}>
            { children }
        </DrinksContext.Provider>
    )
}