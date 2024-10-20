import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DrinksContextProvider } from './context/DrinkContext';
import { AuthContextProvider } from './context/AuthContext';
import { OrdersContextProvider } from './context/OrderContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DrinksContextProvider>
        <OrdersContextProvider>
          <App />
        </OrdersContextProvider>
      </DrinksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
