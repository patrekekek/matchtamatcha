import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, firstName, lastName, address, role = "user") => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/matcha/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, firstName, lastName, address, role})
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            setIsLoading(false);

            localStorage.setItem('user', JSON.stringify(json));

            dispatch({type: 'LOGIN', payload: json});
        }
    }
    return { signup, error, isLoading };
}