import { useAuthContext } from "../hooks/useAuthContext";
import { useOrdersContext } from "../hooks/useOrdersContext";


const OrderProcessingList = ({ order }) => {

    //mawala man ang mga drinks
    //sa dispatch na siya
    const { orders, dispatch } = useOrdersContext();
    const { user } = useAuthContext();

    console.log('hoy', orders);

    const handleUpdate = async (e) => {
        e.stopPropagation();

        const updatedOrder = { ...order, status: "delivered"}

        const response = await fetch('/matcha/orders/' + order._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(updatedOrder)
        })

        const json = await response.json();
        console.log('Updated order', json);

        if (response.ok) {
            dispatch({ type: "UPDATE_ORDER", payload: json });
        }

    }
    





    return (
        <div>
            <div key={order._id} className="order-item">
                <div className="order-summary">
                    <p className="order-id">Order #{order._id}</p>
                    <p className="order-total">Total: ${order.totalPrice.toFixed(2)}</p>
                    <p className="order-status">Status: {order.status}</p>
                </div>
                <ul className="order-drinks-list">
                    {order.drinks.map((drinkObj, idx) => (
                        <li key={idx} className="order-drink-item">
                            <span className="order-drink-quantity">{drinkObj.quantity}</span>
                            <span className="order-drink-name">{drinkObj.drink.name}</span>
                        </li>
                    ))}
                </ul>
            <button className="order-button" onClick={handleUpdate}>Confirmed and for Delivery</button>
            </div>
        </div>
                        
    )
}

export default OrderProcessingList;