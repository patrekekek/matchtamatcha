import { useState, useEffect } from 'react';
import { useOrdersContext } from './useOrdersContext';
import { useAuthContext } from './useAuthContext';

const useFetchOrders = () => {
    const { dispatch } = useOrdersContext();
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchOrders = async () => {

            if (!user || !user.token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/matcha/orders', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                
                const json = await response.json();
                
                if (response.ok) {
                    dispatch({ type: 'SET_ORDER', payload: json });

                } else {
                    console.error("Failed to fetch order");
                }
            } catch (error) {
                console.error("Error fetching order", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [dispatch, user])

    return { loading }

}

export default useFetchOrders;