import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

//Layout
import MainLayout from './components/templates/MainLayout/MainLayout';

//Pages
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import Offers from './pages/Offers/Offers';
import Contact from './pages/Contact/Contact';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Login from './pages/Login/Login';
import Blog from './pages/Blog/Blog';
import About from './pages/About/About';
import Admin from './pages/Admin/Admin';
import OrderSuccess from './pages/OrderSuccess/OrderSuccess';

//Data functiones
import { getCart, addToCart, createUser, authenticateUser, getCartItemsCount } from './data/database';

function App() {
  const [user, setUser] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    //Actualizar contador del carrito
    const updateCartCount = () => {
      const count = getCartItemsCount();
      setCartItemsCount(count);
    };

    updateCartCount();
    
    //Verificar si hay usuario en localStorage (sesión persistente)
    const savedUser = localStorage.getItem('technova_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    //Actualizar contador cada segundo (para simular cambios en tiempo real)
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product, quantity = 1) => {
    addToCart(product.id, quantity);
    const count = getCartItemsCount();
    setCartItemsCount(count);
  };

  const handleLogin = (email, password) => {
    const user = authenticateUser(email, password);
    if (user) {
      setUser(user);
      localStorage.setItem('technova_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const handleRegister = (userData) => {
    const newUser = createUser(userData);
    setUser(newUser);
    localStorage.setItem('technova_user', JSON.stringify(newUser));
    return newUser;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('technova_user');
  };

  //Componente para redirección condicional del admin
  const AdminRoute = ({ children }) => {
    return user && user.role === 'admin' ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <MainLayout 
        cartItemsCount={cartItemsCount} 
        user={user} 
        onLogout={handleLogout}
      >
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onAddToCart={handleAddToCart}
                onViewDetails={(product) => window.location.href = `/product/${product.id}`}
              />
            } 
          />
          <Route 
            path="/categories" 
            element={
              <Categories 
                onAddToCart={handleAddToCart}
                onViewDetails={(product) => window.location.href = `/product/${product.id}`}
              />
            } 
          />
          <Route 
            path="/category/:categorySlug" 
            element={
              <Categories 
                onAddToCart={handleAddToCart}
                onViewDetails={(product) => window.location.href = `/product/${product.id}`}
              />
            } 
          />
          <Route 
            path="/offers" 
            element={
              <Offers 
                onAddToCart={handleAddToCart}
                onViewDetails={(product) => window.location.href = `/product/${product.id}`}
              />
            } 
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/checkout" element={<Checkout user={user} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetail 
                onAddToCart={handleAddToCart}
              />
            } 
          />
          <Route 
            path="/login" 
            element={
              <Login 
                onLogin={handleLogin}
                onRegister={handleRegister}
              />
            } 
          />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } 
          />
          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;