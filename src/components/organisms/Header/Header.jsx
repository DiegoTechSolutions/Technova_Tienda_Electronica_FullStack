import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ cartItemsCount = 0, user = null, onLogout = () => {} }) => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  //Datos del carrito simulados
  const cartItems = [
    { 
      id: 1, 
      name: 'iPhone 15 Pro Max', 
      price: 1499990, 
      quantity: 1, 
      image: '📱',
      category: 'smartphones'
    },
    { 
      id: 2, 
      name: 'AirPods Pro 2da Generación', 
      price: 349990, 
      quantity: 2, 
      image: '🎧',
      category: 'audio'
    }
  ];

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <span className="logo-icon"></span>
              <span className="logo-text">Technova</span>
            </Link>

            {/* Navegación principal */}
            <nav className="nav">
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/categories" className="nav-link">Categorías</Link>
              <Link to="/offers" className="nav-link">Ofertas</Link>
              <Link to="/about" className="nav-link">Nosotros</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/contact" className="nav-link">Contacto</Link>
            </nav>

            {/* Acciones del header */}
            <div className="header-actions">
              {/* Carrito */}
              <div className="cart-container">
                <button 
                  className="cart-button"
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  aria-label="Carrito de compras"
                >
                  <span className="cart-icon">🛒</span>
                  {cartItemsCount > 0 && (
                    <span className="cart-count">{cartItemsCount}</span>
                  )}
                </button>

                {/* Dropdown del carrito */}
                {isCartOpen && (
                  <div className="cart-dropdown">
                    <div className="cart-header">
                      <h3>Tu Carrito</h3>
                      <span className="cart-items-count">{cartItemsCount} items</span>
                    </div>
                    
                    <div className="cart-items">
                      {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                          <div className="cart-item-image">
                            {item.image}
                          </div>
                          <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-meta">
                              <span className="cart-item-price">${item.price.toLocaleString()}</span>
                              <span className="cart-item-quantity">x{item.quantity}</span>
                            </div>
                          </div>
                          <div className="cart-item-total">
                            ${(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="cart-footer">
                      <div className="cart-total">
                        <span>Total:</span>
                        <span className="total-amount">${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="cart-actions">
                        <button 
                          className="btn btn-primary w-full"
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate('/cart');
                          }}
                        >
                          Ver Carrito Completo
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Usuario */}
              {user ? (
                <div className="user-menu">
                  <button className="user-button">
                    <span className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="user-name">{user.name}</span>
                  </button>
                  
                  <div className="user-dropdown">
                    <Link to="/profile" className="dropdown-item">
                      <span className="dropdown-icon">👤</span>
                      Mi Perfil
                    </Link>
                    <Link to="/orders" className="dropdown-item">
                      <span className="dropdown-icon">📦</span>
                      Mis Pedidos
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="dropdown-item">
                        <span className="dropdown-icon">⚙️</span>
                        Administración
                      </Link>
                    )}
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLogout} className="dropdown-item">
                      <span className="dropdown-icon">🚪</span>
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="btn btn-outline btn-sm">
                  Iniciar Sesión
                </Link>
              )}

              {/* Menú móvil */}
              <button 
                className="mobile-menu-button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Abrir menú"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <span className="logo">
                <span className="logo-icon">💎</span>
                Technova
              </span>
              <button 
                className="close-button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <span>×</span>
              </button>
            </div>

            <nav className="mobile-nav">
              <Link 
                to="/" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/categories" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link 
                to="/offers" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ofertas
              </Link>
              <Link 
                to="/about" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                to="/blog" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>

            <div className="mobile-actions">
              {user ? (
                <>
                  <div className="user-info">
                    <div className="user-avatar-large">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="user-name-large">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                  <div className="mobile-buttons">
                    <Link 
                      to="/profile" 
                      className="btn btn-outline w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="btn btn-secondary w-full"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="btn btn-primary w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;