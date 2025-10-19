import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css';

// Importar imágenes (puedes reemplazar estas con tus propias imágenes)
const TeamBanner = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
const OfficeImage = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
const MissionImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";

const About = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Cargar usuario y carrito desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedCart = localStorage.getItem('cart');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Función para manejar cierre de sesión
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCart([]);
    localStorage.removeItem('cart');
    alert('Sesión cerrada correctamente');
    window.location.reload();
  };

  return (
    <div className="about-page">
      {/* Header - Coherente con Home y Offers */}
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
              <Link to="/about" className="nav-link active">Nosotros</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/contact" className="nav-link">Contacto</Link>
            </nav>
            <div className="header-actions">
              {user ? (
                <div className="user-info">
                  <span className="welcome-text">Bienvenido, {user.name}</span>
                  <Link to="/cart" className="btn btn-primary btn-sm cart-btn">
                    🛒 Carrito ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </Link>
                  <button onClick={handleLogout} className="btn btn-outline btn-sm logout-btn">
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

      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <span className="current-category">Nosotros</span>
          </nav>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <div className="about-hero-text">
              <h1 className="about-hero-title">Sobre Technova</h1>
              <p className="about-hero-subtitle">
                Líderes en tecnología e innovación, comprometidos con llevar lo último en dispositivos tecnológicos a cada hogar chileno
              </p>
            </div>
            <div className="about-hero-image">
              <div 
                className="hero-banner"
                style={{ backgroundImage: `url(${TeamBanner})` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <Container className="about-content py-5">
        {/* Nuestra Historia Mejorada */}
        <Row className="mb-5 history-section">
          <Col lg={6}>
            <div className="section-image">
              <div 
                className="history-image"
                style={{ backgroundImage: `url(${OfficeImage})` }}
              ></div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="section-content">
              <h2>Nuestra Historia</h2>
              <p className="lead">
                Technova nació en 2024 con una visión clara: democratizar el acceso a la tecnología de vanguardia en Chile.
              </p>
              <p>
                Fundada por un equipo de expertos en tecnología con más de 15 años de experiencia en el sector, 
                nuestra empresa surge como respuesta a la creciente demanda de productos tecnológicos de calidad 
                a precios accesibles.
              </p>
              <p>
                Comenzamos como una pequeña startup con apenas 5 empleados y hoy contamos con más de 50 profesionales 
                dedicados a brindar la mejor experiencia de compra tecnológica. Nuestro crecimiento exponencial se debe 
                a nuestro compromiso inquebrantable con la calidad, la innovación y el servicio al cliente.
              </p>
              <div className="history-stats">
                <div className="history-stat">
                  <div className="stat-number">2024</div>
                  <div className="stat-label">Año de Fundación</div>
                </div>
                <div className="history-stat">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Empleados</div>
                </div>
                <div className="history-stat">
                  <div className="stat-number">3</div>
                  <div className="stat-label">Tiendas Físicas</div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Misión y Visión */}
        <Row className="mission-vision-section mb-5">
          <Col md={6} className="mb-4">
            <Card className="mission-card h-100">
              <Card.Body>
                <div className="mission-icon">🎯</div>
                <Card.Title>Nuestra Misión</Card.Title>
                <Card.Text>
                  Proporcionar acceso a tecnología innovadora y de calidad, mejorando la vida de las personas 
                  a través de soluciones tecnológicas que sean accesibles, confiables y transformadoras. 
                  Nos esforzamos por ser el puente entre la vanguardia tecnológica y los consumidores chilenos.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="vision-card h-100">
              <Card.Body>
                <div className="vision-icon">🔭</div>
                <Card.Title>Nuestra Visión</Card.Title>
                <Card.Text>
                  Ser la empresa líder en retail tecnológico en Chile para 2030, reconocida por nuestra innovación, 
                  calidad de servicio y compromiso con la comunidad. Aspiramos a transformar la forma en que las 
                  personas interactúan con la tecnología, haciendo de Chile un referente tecnológico en Latinoamérica.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Valores Corporativos */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Nuestros Valores</h2>
            <p className="text-center values-intro mb-5">
              Estos principios guían cada decisión que tomamos y cada interacción que tenemos con nuestros clientes y colaboradores.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 value-card">
              <Card.Body>
                <div className="value-icon mb-3">🚀</div>
                <Card.Title>Innovación Constante</Card.Title>
                <Card.Text>
                  Buscamos siempre estar a la vanguardia tecnológica, ofreciendo los últimos lanzamientos 
                  y tendencias del mercado. Nuestro equipo de expertos evalúa constantemente nuevas tecnologías 
                  para garantizar que solo ofrecemos lo mejor.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 value-card">
              <Card.Body>
                <div className="value-icon mb-3">🤝</div>
                <Card.Title>Confianza y Transparencia</Card.Title>
                <Card.Text>
                  Productos 100% originales con garantía oficial y políticas claras. Creemos en relaciones 
                  a largo plazo basadas en la honestidad y la transparencia en cada transacción.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 value-card">
              <Card.Body>
                <div className="value-icon mb-3">⚡</div>
                <Card.Title>Excelencia en Servicio</Card.Title>
                <Card.Text>
                  Desde la entrega express hasta el soporte post-venta, nos dedicamos a superar las expectativas 
                  de nuestros clientes en cada punto de contacto.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Equipo de Liderazgo */}
        <Row className="mt-5 team-section">
          <Col>
            <h2 className="text-center mb-4">Nuestro Equipo de Liderazgo</h2>
            <p className="text-center team-intro mb-5">
              Conoce al equipo visionario que está impulsando la revolución tecnológica en Chile
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={6} className="mb-4">
            <Card className="text-center team-card">
              <Card.Body>
                <div className="team-avatar mb-3" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}>
                  DA
                </div>
                <Card.Title>Diego Andrés</Card.Title>
                <Card.Subtitle className="mb-2">CEO & Fundador</Card.Subtitle>
                <Card.Text className="team-bio">
                  Con más de 15 años de experiencia en el sector tecnológico, Diego fundó Technova con la visión 
                  de hacer la tecnología accesible para todos. Anteriormente fue Director de Tecnología en varias 
                  empresas Fortune 500.
                </Card.Text>
                <div className="team-expertise">
                  <span className="expertise-tag">Estrategia</span>
                  <span className="expertise-tag">Innovación</span>
                  <span className="expertise-tag">Liderazgo</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="text-center team-card">
              <Card.Body>
                <div className="team-avatar mb-3" style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                }}>
                  MG
                </div>
                <Card.Title>María González</Card.Title>
                <Card.Subtitle className="mb-2">Directora de Tecnología</Card.Subtitle>
                <Card.Text className="team-bio">
                  Ingeniera en Computación con maestría en Inteligencia Artificial. María lidera nuestro equipo 
                  de desarrollo e investigación, asegurando que Technova siempre esté a la vanguardia tecnológica.
                </Card.Text>
                <div className="team-expertise">
                  <span className="expertise-tag">IA</span>
                  <span className="expertise-tag">Desarrollo</span>
                  <span className="expertise-tag">Investigación</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="text-center team-card">
              <Card.Body>
                <div className="team-avatar mb-3" style={{
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                }}>
                  CL
                </div>
                <Card.Title>Carlos López</Card.Title>
                <Card.Subtitle className="mb-2">Jefe de Ventas</Card.Subtitle>
                <Card.Text className="team-bio">
                  Especialista en ventas B2C con 12 años de experiencia en retail tecnológico. Carlos ha 
                  construido y liderado equipos de ventas que han batido récords consecutivos de ingresos.
                </Card.Text>
                <div className="team-expertise">
                  <span className="expertise-tag">Ventas</span>
                  <span className="expertise-tag">Estrategia</span>
                  <span className="expertise-tag">CRM</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4">
            <Card className="text-center team-card">
              <Card.Body>
                <div className="team-avatar mb-3" style={{
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                }}>
                  AM
                </div>
                <Card.Title>Ana Martínez</Card.Title>
                <Card.Subtitle className="mb-2">Gerente de Marketing</Card.Subtitle>
                <Card.Text className="team-bio">
                  Marketing digital specialist con expertise en growth hacking y branding. Ana ha liderado 
                  campañas que han posicionado a Technova como marca líder en el mercado chileno.
                </Card.Text>
                <div className="team-expertise">
                  <span className="expertise-tag">Marketing</span>
                  <span className="expertise-tag">Branding</span>
                  <span className="expertise-tag">Growth</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Compromiso con la Comunidad */}
        <Row className="community-section mt-5">
          <Col lg={6}>
            <div className="section-content">
              <h2>Compromiso con la Comunidad</h2>
              <p>
                En Technova creemos que la tecnología debe ser una fuerza para el bien social. Por eso, 
                dedicamos parte de nuestros recursos a iniciativas que promueven la educación tecnológica 
                en comunidades vulnerables.
              </p>
              <ul className="community-initiatives">
                <li>Programas de donación de equipos a escuelas públicas</li>
                <li>Talleres gratuitos de programación para jóvenes</li>
                <li>Alianzas con ONGs para reducir la brecha digital</li>
                <li>Voluntariado corporativo en iniciativas tecnológicas</li>
              </ul>
            </div>
          </Col>
          <Col lg={6}>
            <div className="section-image">
              <div 
                className="community-image"
                style={{ backgroundImage: `url(${MissionImage})` }}
              ></div>
            </div>
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="stats-section mt-5">
          <Col>
            <h2 className="text-center mb-5">Technova en Números</h2>
          </Col>
        </Row>
        <Row>
          <Col md={3} className="text-center mb-4">
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Clientes Satisfechos</div>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Productos Premium</div>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Soporte Especializado</div>
            </div>
          </Col>
          <Col md={3} className="text-center mb-4">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Garantía de Calidad</div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;