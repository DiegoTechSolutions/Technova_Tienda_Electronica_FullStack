import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (onLogin(loginData.email, loginData.password)) {
      navigate('/');
    } else {
      alert('Credenciales incorrectas. Usa: admin@technova.com / admin123');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    const newUser = onRegister({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password
    });
    
    if (newUser) {
      navigate('/');
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Iniciando sesión con ${provider} (simulación)`);
    // En una app real, aquí iría la integración con OAuth
  };

  return (
    <Container className="login-page">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="login-card">
            <Card.Body>
              {/* Brand Section */}
              <div className="brand-section">
                <span className="brand-logo">🚀</span>
                <h2>Technova</h2>
                <p>Tu tienda de tecnología de confianza</p>
              </div>

              <Tabs
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab)}
                className="mb-4"
                justify
              >
                {/* Login Tab */}
                <Tab eventKey="login" title="Iniciar Sesión">
                  <Form onSubmit={handleLoginSubmit}>
                    <Form.Group>
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData({
                          ...loginData,
                          email: e.target.value
                        })}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Tu contraseña"
                        value={loginData.password}
                        onChange={(e) => setLoginData({
                          ...loginData,
                          password: e.target.value
                        })}
                        required
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check 
                        type="checkbox" 
                        label="Recordarme" 
                      />
                      <a href="#forgot" className="text-primary text-decoration-none">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>

                    <Button type="submit" className="btn-login mb-3">
                      🔐 Iniciar Sesión
                    </Button>

                    <div className="divider">
                      <span>o continúa con</span>
                    </div>

                    <div className="social-buttons">
                      <Button 
                        variant="outline" 
                        className="btn-social btn-google"
                        onClick={() => handleSocialLogin('Google')}
                      >
                        <span>🔍</span> Google
                      </Button>
                      <Button 
                        variant="outline" 
                        className="btn-social btn-facebook"
                        onClick={() => handleSocialLogin('Facebook')}
                      >
                        <span>👥</span> Facebook
                      </Button>
                    </div>
                  </Form>
                </Tab>

                {/* Register Tab */}
                <Tab eventKey="register" title="Crear Cuenta">
                  <Form onSubmit={handleRegisterSubmit}>
                    <Form.Group>
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu nombre completo"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({
                          ...registerData,
                          name: e.target.value
                        })}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Correo Electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@email.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({
                          ...registerData,
                          email: e.target.value
                        })}
                        required
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Mínimo 8 caracteres"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({
                          ...registerData,
                          password: e.target.value
                        })}
                        required
                        minLength="8"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Confirmar Contraseña</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Repite tu contraseña"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value
                        })}
                        required
                      />
                    </Form.Group>

                    <Form.Check 
                      type="checkbox" 
                      label="Acepto los términos y condiciones" 
                      className="mb-4"
                      required
                    />

                    <Button type="submit" className="btn-register">
                      🎉 Crear Cuenta
                    </Button>

                    <div className="text-center mt-3">
                      <small className="text-muted">
                        Al registrarte, aceptas nuestros{' '}
                        <a href="#terms" className="text-primary text-decoration-none">
                          Términos de Servicio
                        </a>{' '}
                        y{' '}
                        <a href="#privacy" className="text-primary text-decoration-none">
                          Política de Privacidad
                        </a>
                      </small>
                    </div>
                  </Form>
                </Tab>
              </Tabs>

              {/* Demo Credentials */}
              <div className="demo-credentials mt-4 p-3 bg-light rounded">
                <h6 className="mb-2">💡 Credenciales de Demo:</h6>
                <div className="row small">
                  <div className="col-6">
                    <strong>Admin:</strong><br />
                    admin@technova.com<br />
                    admin123
                  </div>
                  <div className="col-6">
                    <strong>Cliente:</strong><br />
                    cliente@technova.com<br />
                    cliente123
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;