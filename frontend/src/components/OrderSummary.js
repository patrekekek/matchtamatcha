

const OrderSummary = ({ orders, handleSubmit}) => {

    return (
        <div className="order-container">
            <h2>Your Order</h2>
            <div className="order-list">
                <ul>
                    {orders.drinks.map((item, index) => (
                        <li key={index}>
                            <span><strong>{item.quantity}</strong></span>
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <button className="order-button" onClick={handleSubmit}>Finalize and Place Order</button>
        </div>
    )
}

export default OrderSummary;