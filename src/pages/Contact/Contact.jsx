import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [toast, setToast] = useState({ show: false, message: 'Mensaje enviado correctamente ✅' });

  const navigate = useNavigate();

  // === Helpers ===
  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).toLowerCase());

  const isFormValid =
    formData.name.trim().length >= 2 &&
    isValidEmail(formData.email) &&
    formData.subject.trim().length >= 3 &&
    formData.message.trim().length >= 10;

  // === Cargar user/cart + borrador desde localStorage ===
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    const draft = localStorage.getItem('contactDraft');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));

    if (draft) {
      setFormData(JSON.parse(draft));
    } else if (savedUser) {
      const u = JSON.parse(savedUser);
      setFormData((prev) => ({
        ...prev,
        name: u?.name || '',
        email: u?.email || ''
      }));
    }
  }, []);

  // Autosave borrador
  useEffect(() => {
    localStorage.setItem('contactDraft', JSON.stringify(formData));
  }, [formData]);

  // === Header: logout coherente ===
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCart([]);
    localStorage.removeItem('cart');
    alert('Sesión cerrada correctamente');
    window.location.reload();
  };

  // === Form ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limpiar espacios extra iniciales en campos de una sola línea
    const cleanValue =
      name === 'message' ? value : value.replace(/\s{2,}/g, ' ');
    setFormData((prev) => ({ ...prev, [name]: cleanValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Guardar envío en localStorage (persistencia adicional)
    const key = 'contactMessages';
    const previous = JSON.parse(localStorage.getItem(key) || '[]');
    const payload = {
      ...formData,
      id: Date.now(),
      sentAt: new Date().toISOString(),
      fromUser: user?.name || null
    };
    localStorage.setItem(key, JSON.stringify([payload, ...previous]));

    // Limpiar UI + borrador
    setFormData({ name: user?.name || '', email: user?.email || '', subject: '', message: '' });
    localStorage.removeItem('contactDraft');

    // Mini-toast
    setToast({ show: true, message: 'Mensaje enviado correctamente ✅' });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
  };

  return (
    <div className="contact-page">
      {/* Header coherente */}
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
              <Link to="/contact" className="nav-link active">Contacto</Link>
            </nav>
            <div className="header-actions">
              {user ? (
                <div className="user-info">
                  <span className="welcome-text">Bienvenido, {user.name}</span>
                  <Link to="/cart" className="btn btn-primary btn-sm cart-btn">
                    🛒 Carrito ({cart.reduce((acc, it) => acc + (it.quantity || 1), 0)})
                  </Link>
                  <button onClick={handleLogout} className="btn btn-outline btn-sm logout-btn">
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="btn btn-outline btn-sm login-btn">Iniciar Sesión</Link>
                  <Link to="/register" className="btn btn-primary btn-sm register-btn">Registrarse</Link>
                </div>
              )}
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
            <span className="current-category">Contacto</span>
          </nav>
        </div>
      </section>

      {/* Hero simple y limpio */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-wrap">
            <div className="hero-text">
              <h1 className="hero-title">¿Hablamos?</h1>
              <p className="hero-subtitle">En menos de 24–48h un especialista te responde.</p>
            </div>
            <div className="hero-icon" aria-hidden>✉️</div>
          </div>
        </div>
      </section>

      {/* Contenido */}
      <Container className="contact-content py-5">
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <Card className="contact-card shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          minLength={2}
                          placeholder="Tu nombre"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tucorreo@ejemplo.com"
                          isInvalid={formData.email !== '' && !isValidEmail(formData.email)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ingresa un email válido.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Asunto *</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      minLength={3}
                      placeholder="¿Sobre qué te ayudamos?"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Mensaje *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      placeholder="Cuéntanos detalles para ayudarte mejor…"
                    />
                    <div className="field-hint">
                      Mínimo 10 caracteres. No compartiremos tus datos.
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 submit-btn"
                    disabled={!isFormValid}
                    aria-disabled={!isFormValid}
                  >
                    Enviar Mensaje
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Información de contacto */}
        <Row className="mt-4">
          <Col md={4} className="mb-4">
            <Card className="h-100 info-card">
              <Card.Body className="text-center">
                <div className="contact-icon" aria-hidden>📍</div>
                <Card.Title>Dirección</Card.Title>
                <Card.Text className="muted">
                  Av. Principal 123<br/>Santiago, Chile
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 info-card">
              <Card.Body className="text-center">
                <div className="contact-icon" aria-hidden>📞</div>
                <Card.Title>Teléfono</Card.Title>
                <Card.Text className="muted">
                  +56 9 1234 5678<br/>Lun a Vie · 9:00–18:00
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 info-card">
              <Card.Body className="text-center">
                <div className="contact-icon" aria-hidden>✉️</div>
                <Card.Title>Email</Card.Title>
                <Card.Text className="muted">
                  info@technova.com<br/>soporte@technova.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Mini-toast de confirmación */}
      <div className={`mini-toast ${toast.show ? 'show' : ''}`} role="status" aria-live="polite">
        {toast.message}
      </div>
    </div>
  );
};

export default Contact;
