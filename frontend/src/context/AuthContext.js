import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext();

//reducer function
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload, loading: false };
        case 'LOGOUT':
            return { user: null, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload }
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        loading: true,
    })

    //check at the start if there's already a user logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        } else {
            dispatch({ type: 'SET_LOADING', payload: false })
        }

    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}