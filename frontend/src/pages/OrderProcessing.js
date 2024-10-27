
import { useOrdersContext } from '../hooks/useOrdersContext';
import useFetchOrders from '../hooks/useFetchOrders';


//compoenents
import OrderProcessingList from '../components/OrderProcessingList';

const OrderProcessing = () => {
    const { loading } = useFetchOrders();
    const { orders } = useOrdersContext();


    if (loading) {
        return (
            <p>Loading...</p>
        )
    }



    return (

        //make a component for this

        <div className="orders-container">
            <div className="orders-list">
                {orders && orders.map((order) => (
                    <OrderProcessingList
                        key={order._id}
                        order={order}
                    />
                ))}
            </div>
        </div>
    )
    
}

export default OrderProcessing;

// [
//     {
//         "_id": "66b9f570eb3c6c4bd38d3b9f",
//         "drinks": [
//             {
//                 "drink": {
//                     "_id": "6699f34f5ec8f85bed2433d2",
//                     "name": "Clean Matcha",
//                     "priceLarge": 130
//                 },
//                 "quantity": 2
//             },
//             {
//                 "drink": {
//                     "_id": "6699f34f5ec8f85bed2433d3",
//                     "name": "Vanilla Matcha",
//                     "priceLarge": 125
//                 },
//                 "quantity": 1
//             },
//             {
//                 "drink": {
//                     "_id": "6699f34f5ec8f85bed2433d5",
//                     "name": "Strawberry Matcha",
//                     "priceLarge": 160
//                 },
//                 "quantity": 1
//             }
//         ],
//         "user": "6695f304740d303ebba2cc67",
//         "totalPrice": 545,
//         "status": "pending",
//         "createdAt": "2024-08-12T11:43:44.879Z",
//         "updatedAt": "2024-08-12T11:43:44.879Z",
//         "__v": 0
//     }
// ]