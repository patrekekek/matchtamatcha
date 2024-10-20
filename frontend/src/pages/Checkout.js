import OrderSummary from '../components/OrderSummary';
import { useOrdersContext } from '../hooks/useOrdersContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { orders } = useOrdersContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    console.log('orders', orders); //obj
    console.log('user', user.id)

    const handleSubmit = () => {
        const requestData = {
            drinks: orders.drinks,
            user: user.id,
            totalPrice: orders.totalPrice
        };

        const sendOrder = async (requestData) => {
            try {
                const response = await fetch('/matcha/orders', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    },
                    body: JSON.stringify(requestData)
                });
    
                if (!response.ok) {
                    const errorResponse = await response.json();
                    console.error('Error response:', errorResponse);
                    throw new Error('Failed to order Drinks');
                }
    
                const json = await response.json();
                console.log('Drinks ordered successfully:', json);

            } catch (error) {
                console.error('Error while ordering drinks:', error);
            }
        };

        sendOrder(requestData);
        navigate('/order');
    }

    
    if (orders && orders.drinks && orders.drinks.length > 0) {
        return (
            <OrderSummary
                orders={orders}
                handleSubmit={handleSubmit}
            />
        )
    }

    return (
        <div>
            <h1>No orders</h1>
        </div>
    )
}

export default Checkout;