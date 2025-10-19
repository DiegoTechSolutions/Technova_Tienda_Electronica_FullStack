// Register.jsx - VERSIÓN PROFESIONAL MEJORADA
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Verificar si ya está logueado y redirigir
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'La contraseña debe incluir mayúsculas, minúsculas y números';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simular proceso de registro
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: formData.name.trim(),
        email: formData.email,
        role: 'user',
        avatar: formData.name.charAt(0).toUpperCase(),
        joinDate: new Date().toISOString(),
        preferences: {
          newsletter: true,
          notifications: true
        }
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      
      // Mostrar mensaje de éxito
      alert(`¡Bienvenido a Technova, ${formData.name}!`);
      navigate('/');
    }, 2000);
  };

  return (
    <div className="auth-page">
      {/* Header Mejorado */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/">
                <h1>Technova</h1>
              </Link>
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
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline btn-sm login-btn">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm register-btn active">
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <span className="current-category">Registrarse</span>
          </nav>
        </div>
      </section>

      {/* Main Auth Section */}
      <section className="auth-section">
        <div className="container">
          <div className="auth-container">
            <div className="auth-card">
              <div className="auth-header">
                <div className="auth-logo">
                  <div className="logo-icon">👋</div>
                </div>
                <h2>Crear Cuenta</h2>
                <p>Únete a la comunidad Technova</p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className={errors.name ? 'error' : ''}
                    required
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={errors.password ? 'error' : ''}
                    required
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                  <div className="password-requirements">
                    La contraseña debe tener al menos 6 caracteres, incluir mayúsculas, minúsculas y números.
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={errors.confirmPassword ? 'error' : ''}
                    required
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className={errors.acceptTerms ? 'error' : ''}
                    />
                    <span className="checkmark"></span>
                    Acepto los <Link to="/terms" className="terms-link">términos y condiciones</Link> y la <Link to="/privacy" className="terms-link">política de privacidad</Link>
                  </label>
                  {errors.acceptTerms && <span className="error-message">{errors.acceptTerms}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-block auth-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Creando Cuenta...
                    </>
                  ) : (
                    'Crear Cuenta'
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>¿Ya tienes cuenta?</span>
              </div>

              <Link to="/login" className="btn btn-outline btn-block">
                Iniciar Sesión
              </Link>

              <div className="auth-features">
                <div className="feature-item">
                  <div className="feature-icon">🎁</div>
                  <div className="feature-text">
                    <strong>10% de Descuento</strong>
                    <span>En tu primera compra</span>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">⚡</div>
                  <div className="feature-text">
                    <strong>Compras Express</strong>
                    <span>Proceso de compra acelerado</span>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📱</div>
                  <div className="feature-text">
                    <strong>Seguimiento en Tiempo Real</strong>
                    <span>De todos tus pedidos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;