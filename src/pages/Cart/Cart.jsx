import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import './Cart.css';

const Cart = ({ user, onLogout }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto del carrito?')) {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  const handleContinueShopping = () => {
    navigate('/categories');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <header className="main-header">
          <div className="container">
            <div className="header-content">
              <div className="logo">
                <h1>Technova</h1>
              </div>
              <nav className="main-nav">
                <Link to="/" className="nav-link">Inicio</Link>
                <Link to="/categories" className="nav-link">Categorías</Link>
                <Link to="/offers" className="nav-link">Ofertas</Link>
                <Link to="/about" className="nav-link">Nosotros</Link>
                <Link to="/blog" className="nav-link">Blog</Link>
                <Link to="/contact" className="nav-link">Contacto</Link>
              </nav>
              <div className="header-actions">
                {user ? (
                  <div className="user-info">
                    <span className="welcome-text">Bienvenido, {user.name}</span>
                    <Link to="/cart" className="btn btn-primary btn-sm cart-btn active">
                      🛒 Carrito ({cart.length})
                    </Link>
                    <button onClick={onLogout} className="btn btn-outline btn-sm logout-btn">
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <div className="auth-buttons">
                    <Link to="/login" className="btn btn-outline btn-sm login-btn">
                      Iniciar Sesión
                    </Link>
                    <Link to="/register" className="btn btn-primary btn-sm register-btn">
                      Registrarse
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="breadcrumb-section">
          <div className="container">
            <nav className="breadcrumb">
              <Link to="/">Inicio</Link>
              <span>/</span>
              <span className="current-category">Carrito de Compras</span>
            </nav>
          </div>
        </section>

        <section className="empty-cart-section">
          <div className="container">
            <div className="empty-cart-content">
              <div className="empty-cart-icon">🛒</div>
              <h2>Tu carrito está vacío</h2>
              <p>Agrega algunos productos increíbles de Technova</p>
              <button onClick={handleContinueShopping} className="btn btn-primary btn-lg">
                Continuar Comprando
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Technova</h1>
            </div>
            <nav className="main-nav">
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/categories" className="nav-link">Categorías</Link>
              <Link to="/offers" className="nav-link">Ofertas</Link>
              <Link to="/about" className="nav-link">Nosotros</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/contact" className="nav-link">Contacto</Link>
            </nav>
            <div className="header-actions">
              {user ? (
                <div className="user-info">
                  <span className="welcome-text">Bienvenido, {user.name}</span>
                  <Link to="/cart" className="btn btn-primary btn-sm cart-btn active">
                    🛒 Carrito ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </Link>
                  <button onClick={onLogout} className="btn btn-outline btn-sm logout-btn">
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="btn btn-outline btn-sm login-btn">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm register-btn">
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <span className="current-category">Carrito de Compras</span>
          </nav>
        </div>
      </section>

      <section className="cart-section">
        <div className="container">
          <div className="cart-layout">
            <div className="cart-main">
              <div className="cart-header">
                <h1>Carrito de Compras</h1>
                <button onClick={clearCart} className="btn btn-outline btn-sm">
                  Vaciar Carrito
                </button>
              </div>

              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <div className="image-placeholder">{item.image}</div>
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-description">{item.description}</p>
                      <div className="item-price">${item.price.toLocaleString()}</div>
                    </div>
                    <div className="item-quantity">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                    <div className="item-subtotal">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="remove-btn"
                      title="Eliminar producto"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Resumen de Compra</h3>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Envío:</span>
                    <span className="free-shipping">Gratis</span>
                  </div>
                  <div className="summary-row">
                    <span>Descuento:</span>
                    <span className="discount">-$0</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn btn-primary btn-block checkout-btn"
                >
                  {loading ? 'Procesando...' : 'Proceder al Pago'}
                </button>
                <button onClick={handleContinueShopping} className="btn btn-outline btn-block">
                  Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;