import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ cartItemsCount = 0, user = null, onLogout = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cerrar dropdowns cuando cambia la ruta
  useEffect(() => {
    setIsCartOpen(false);
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Datos del carrito simulados
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

  // Detectar si estamos en páginas de autenticación
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <span className="logo-icon">💎</span>
              <span className="logo-text">Technova</span>
            </Link>

            {/* Navegación principal */}
            <nav className="nav">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Inicio
              </Link>
              <Link to="/categories" className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}>
                Categorías
              </Link>
              <Link to="/offers" className={`nav-link ${location.pathname === '/offers' ? 'active' : ''}`}>
                Ofertas
              </Link>
              <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                Nosotros
              </Link>
              <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>
                Blog
              </Link>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                Contacto
              </Link>
            </nav>

            {/* Acciones del header */}
            <div className="header-actions">
              {/* Carrito - Solo mostrar si no estamos en auth page y hay usuario */}
              {!isAuthPage && user && (
                <div className="cart-container">
                  <button 
                    className="cart-button"
                    onClick={() => {
                      setIsCartOpen(!isCartOpen);
                      setIsUserMenuOpen(false);
                    }}
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
              )}

              {/* Menú de usuario - Mostrar siempre que haya usuario logueado y no estemos en auth page */}
              {user && !isAuthPage ? (
                <div className="user-menu">
                  <button 
                    className="user-button"
                    onClick={() => {
                      setIsUserMenuOpen(!isUserMenuOpen);
                      setIsCartOpen(false);
                    }}
                  >
                    <span className="user-avatar">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                    <span className="user-name">{user.name}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="user-dropdown">
                      <div className="user-info-dropdown">
                        <div className="user-avatar-dropdown">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="user-details-dropdown">
                          <div className="user-name-dropdown">{user.name}</div>
                          <div className="user-email-dropdown">{user.email}</div>
                          <div className="user-role-badge">{user.role}</div>
                        </div>
                      </div>
                      
                      <div className="dropdown-divider"></div>
                      
                      <Link 
                        to="/profile" 
                        className="dropdown-item"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="dropdown-icon">👤</span>
                        Mi Perfil
                      </Link>
                      <Link 
                        to="/orders" 
                        className="dropdown-item"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="dropdown-icon">📦</span>
                        Mis Pedidos
                      </Link>
                      
                      {/* 🔥 CORRECCIÓN: Mostrar panel admin SOLO para usuarios admin */}
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="dropdown-item admin-item"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <span className="dropdown-icon">⚙️</span>
                          Panel Administrativo
                        </Link>
                      )}
                      
                      <div className="dropdown-divider"></div>
                      <button 
                        onClick={handleLogout} 
                        className="dropdown-item logout-item"
                      >
                        <span className="dropdown-icon">🚪</span>
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : !isAuthPage ? ( // Solo mostrar botones de auth si NO estamos en auth page
                <div className="auth-buttons">
                  <Link to="/login" className="btn btn-outline btn-sm">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm">
                    Registrarse
                  </Link>
                </div>
              ) : null}

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
              {user && !isAuthPage ? (
                <>
                  <div className="user-info">
                    <div className="user-avatar-large">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <div className="user-name-large">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                      <div className="user-role">{user.role}</div>
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
                    <Link 
                      to="/orders" 
                      className="btn btn-outline w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Mis Pedidos
                    </Link>
                    
                    {/* 🔥 CORRECCIÓN: Mostrar panel admin en móvil también */}
                    {user.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="btn btn-primary w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Panel Administrativo
                      </Link>
                    )}
                    
                    <button 
                      onClick={handleLogout}
                      className="btn btn-secondary w-full"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : !isAuthPage ? (
                <div className="mobile-auth-buttons">
                  <Link 
                    to="/login" 
                    className="btn btn-primary w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-outline w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;