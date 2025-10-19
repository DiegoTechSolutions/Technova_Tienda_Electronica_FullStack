import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import './App.css';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Categories from './pages/Categories/Categories';
import Blog from './pages/Blog/Blog';
import Admin from './pages/Admin/Admin';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Offers from './pages/Offers/Offers';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando Technova...</p>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
            <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/" />} />
            <Route path="/categories" element={<Categories user={user} onLogout={handleLogout} />} />
            <Route path="/categories/:categoryName" element={<Categories user={user} onLogout={handleLogout} />} />
            <Route path="/blog" element={<Blog user={user} onLogout={handleLogout} />} />
            <Route path="/admin" element={user?.role === 'admin' ? <Admin user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/cart" element={<Cart user={user} onLogout={handleLogout} />} />
            <Route path="/checkout" element={user ? <Checkout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/order-success" element={<OrderSuccess user={user} onLogout={handleLogout} />} />
            <Route path="/product/:id" element={<ProductDetail user={user} onLogout={handleLogout} />} />
            <Route path="/offers" element={<Offers user={user} onLogout={handleLogout} />} />
            <Route path="/about" element={<About user={user} onLogout={handleLogout} />} />
            <Route path="/contact" element={<Contact user={user} onLogout={handleLogout} />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;