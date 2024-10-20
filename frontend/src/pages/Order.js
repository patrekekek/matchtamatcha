import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const Order = () => {

    const { user } = useAuthContext();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    console.log('order', order.drinks)

    useEffect(() => {
        const fetchOrder = async () => {
    
            if (!user || !user.token) {
                setLoading(false);
                return;
            }
    
            try {
                const response = await fetch(`/matcha/orders/${user.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
    
                const json = await response.json();
    
                if (response.ok) {
                    setOrder(json);
                } else {
                    console.error('Failed to fetch order:', json.error);
                }
                setLoading(false);
    
            } catch (error) {
                console.error('Fetch error:', error);
                setLoading(false);
            }
        };
        fetchOrder();
    }, [user]);
    


    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className="order-container">
            <h1>Your Order</h1>
            <p>Order Number: <strong>#{order._id}</strong></p>
            <p>Total: <strong>₱{order.totalPrice}</strong></p>
            <p>Status: {order.status}</p>
            <div className="order-list">
                {order ? (
                    <ul>
                    {order.drinks && order.drinks.map((drinkObj, index) => (
                        <li key={index}>
                            <span><strong>{drinkObj.quantity}</strong></span>
                            <span>{drinkObj.drink.name}</span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p>No orders available.</p>
                )}
            </div>
        </div>
    );
};

export default Order;

