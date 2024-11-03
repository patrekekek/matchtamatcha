import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useOrdersContext } from '../hooks/useOrdersContext';


const Order = () => {

    const { user } = useAuthContext();
    const { dispatch } = useOrdersContext();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);


    console.log('order', order);
    useEffect(() => {
        const fetchOrder = async () => {
    
            if (!user || !user.token) {
                setLoading(false);
                return;
            }
    
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/matcha/orders/${user.id}`, {
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
    }, [user, order._id]);
    

    const handleReceived = async (e) => {
        e.stopPropagation();

        const updatedOrder = { ...order, status: "received" }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/matcha/orders/` + order._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedOrder)
        })

        const json = await response.json();

        if (response.ok) {
            setOrder({ ...order, status: "received" });
            dispatch({ type: 'UPDATE_ORDER', payload: json});
        }
    }




    if (loading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className="order-container" key={order._id}>
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
            <button className="order-button" onClick={handleReceived}>Order Received</button>
        </div>
    );
};

export default Order;

