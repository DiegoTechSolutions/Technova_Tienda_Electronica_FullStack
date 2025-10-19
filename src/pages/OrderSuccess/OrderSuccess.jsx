import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = ({ user, onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir si no hay usuario
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="order-success-page">
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

      <section className="success-section">
        <div className="container">
          <div className="success-content">
            <div className="success-icon">🎉</div>
            <h1>¡Pedido Completado Exitosamente!</h1>
            <p className="success-message">
              Gracias por tu compra en Technova. Tu pedido ha sido procesado y será enviado pronto.
            </p>
            
            <div className="order-details">
              <div className="detail-card">
                <h3>Detalles del Pedido</h3>
                <div className="detail-row">
                  <span>Número de Orden:</span>
                  <span>TECH-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</span>
                </div>
                <div className="detail-row">
                  <span>Fecha:</span>
                  <span>{new Date().toLocaleDateString('es-CL')}</span>
                </div>
                <div className="detail-row">
                  <span>Estado:</span>
                  <span className="status processing">En Proceso</span>
                </div>
                <div className="detail-row">
                  <span>Método de Pago:</span>
                  <span>Tarjeta de Crédito</span>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/categories" className="btn btn-primary btn-lg">
                Continuar Comprando
              </Link>
              <Link to="/" className="btn btn-outline btn-lg">
                Volver al Inicio
              </Link>
            </div>

            <div className="success-features">
              <div className="feature-item">
                <div className="feature-icon">📧</div>
                <div className="feature-text">
                  <strong>Confirmación por Email</strong>
                  <span>Recibirás un email con todos los detalles</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🚚</div>
                <div className="feature-text">
                  <strong>Seguimiento en Tiempo Real</strong>
                  <span>Monitorea tu pedido en todo momento</span>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📞</div>
                <div className="feature-text">
                  <strong>Soporte 24/7</strong>
                  <span>Estamos aquí para ayudarte</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderSuccess;