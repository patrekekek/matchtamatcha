

const OrderSummary = ({ orders, handleSubmit}) => {

    return (
        <div>
            {orders.drinks.map((item, index) => (
                <li key={index}>
                    <span>Drink ID: {item.drink}</span>
                    <span>Name: {item.name}</span>
                    <span>Quantity: {item.quantity}</span>
                </li>
            ))}
            <button onClick={handleSubmit}>Finalize drinks</button>
        </div>
    )
}

export default OrderSummary;