import { createContext, useReducer } from 'react';

export const OrdersContext = createContext();


//reducer function
export const ordersReducer = (state, action) => {

    switch(action.type) {
        case 'SET_ORDER':
            return {
                ...state,
                orders: action.payload
            }
        case 'DELETE_ORDER':
            return {
                ...state,
                orders: {}
            }
        case 'UPDATE_ORDER':
            return {
                ...state,
                orders: state.orders.map((order) => order._id === action.payload._id ? action.payload : order)
            }
        default:
            return state;
    }
}

export const OrdersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ordersReducer, {
        orders: {}
    });

    return (
        <OrdersContext.Provider value={{ ...state, dispatch }}>
            { children }
        </OrdersContext.Provider>
    )
}