import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';


//pages and components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import UpdateMenu from './pages/UpdateMenu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderProcessing from './pages/OrderProcessing'

function App() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>

            <Route 
              path="/"
              element={<Home />}
            />

            <Route 
              path="/checkout"
              element={<Checkout />}
            />
            
            <Route 
              path="/order"
              element={<Order />}
            />

            <Route 
              path="/updateMenu"
              element={user && user.role === "admin" ? <UpdateMenu /> : <Navigate to="/login" />}
            />

            <Route 
              path="/orderprocessing"
              element={user && user.role === "admin" ? <OrderProcessing /> : <Navigate to="/login" />}
            />

            <Route 
              path="/login"
              element={!user 
                ? <Login /> 
                : user.role === "admin" 
                ? <Navigate to="/updateMenu" />
                : <Navigate to="/order" />}
            />

            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/order" />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
