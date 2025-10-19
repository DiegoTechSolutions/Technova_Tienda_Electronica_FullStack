import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { addOrder } from '../../data/database';
import './Checkout.css';

const Checkout = ({ user, onLogout }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: {
      street: '',
      apartment: '',
      region: '',
      city: '',
      zipCode: ''
    },
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      const orderData = {
        customer: {
          id: user.id,
          nombre: formData.firstName,
          apellido: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getCartTotal(),
        shippingAddress: formData.address,
        paymentMethod: formData.paymentMethod
      };

      // Guardar orden
      addOrder(orderData);
      
      // Limpiar carrito
      clearCart();
      
      setLoading(false);
      navigate('/order-success');
    }, 3000);
  };

  const regions = [
    'Región Metropolitana de Santiago',
    'Región de Valparaíso',
    'Región del Biobío',
    'Región de La Araucanía',
    'Región de Los Lagos',
    'Región de Antofagasta',
    'Región de Atacama',
    'Región de Coquimbo',
    'Región del Maule',
    'Región de Los Ríos',
    'Región de Arica y Parinacota',
    'Región de Tarapacá',
    'Región de Magallanes'
  ];

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
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

      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <Link to="/cart">Carrito</Link>
            <span>/</span>
            <span className="current-category">Checkout</span>
          </nav>
        </div>
      </section>

      <section className="checkout-section">
        <div className="container">
          <div className="checkout-layout">
            <div className="checkout-main">
              <h1>Finalizar Compra</h1>
              
              <form onSubmit={handleSubmit} className="checkout-form">
                {/* Información Personal */}
                <div className="form-section">
                  <h3>Información Personal</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Apellido *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Teléfono *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Dirección de Envío */}
                <div className="form-section">
                  <h3>Dirección de Envío</h3>
                  <div className="form-group">
                    <label>Calle y Número *</label>
                    <input
                      type="text"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Departamento (opcional)</label>
                    <input
                      type="text"
                      name="address.apartment"
                      value={formData.address.apartment}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Región *</label>
                      <select
                        name="address.region"
                        value={formData.address.region}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar Región</option>
                        {regions.map(region => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Ciudad *</label>
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Código Postal *</label>
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Método de Pago */}
                <div className="form-section">
                  <h3>Método de Pago</h3>
                  <div className="payment-methods">
                    <label className="payment-method">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={formData.paymentMethod === 'credit_card'}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Tarjeta de Crédito
                    </label>
                    <label className="payment-method">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="debit_card"
                        checked={formData.paymentMethod === 'debit_card'}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Tarjeta de Débito
                    </label>
                    <label className="payment-method">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="transfer"
                        checked={formData.paymentMethod === 'transfer'}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      Transferencia Bancaria
                    </label>
                  </div>

                  {formData.paymentMethod.includes('card') && (
                    <div className="card-details">
                      <div className="form-group">
                        <label>Número de Tarjeta *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Fecha de Expiración *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/AA"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV *</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Nombre en la Tarjeta *</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-block submit-order-btn"
                >
                  {loading ? 'Procesando Pago...' : `Pagar $${getCartTotal().toLocaleString()}`}
                </button>
              </form>
            </div>

            <div className="checkout-summary">
              <div className="summary-card">
                <h3>Resumen del Pedido</h3>
                <div className="order-items">
                  {cart.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                      </div>
                      <span className="item-total">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="total-row">
                    <span>Envío:</span>
                    <span className="free">Gratis</span>
                  </div>
                  <div className="total-row">
                    <span>Impuestos:</span>
                    <span>$0</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total:</span>
                    <span>${getCartTotal().toLocaleString()}</span>
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

export default Checkout;