import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import './Blog.css';

const Blog = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [expandedPost, setExpandedPost] = useState(null);
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

  // Función para expandir/contraer artículos
  const toggleExpandPost = (postId) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
    } else {
      setExpandedPost(postId);
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: 'Los mejores smartphones de 2024',
      excerpt: 'Revisamos los últimos lanzamientos en el mundo de los smartphones y qué esperar para el resto del año.',
      date: '15 Marzo 2024',
      author: 'Diego Andrés',
      authorRole: 'CEO & Fundador',
      authorAvatar: 'DA',
      image: '📱',
      category: 'Tecnología',
      readTime: '5 min',
      content: `
        <h3>La Revolución de los Smartphones en 2024</h3>
        <p>El año 2024 está marcando un punto de inflexión en la industria de los smartphones. Con la integración de IA nativa en los dispositivos, estamos viendo capacidades que antes solo imaginábamos.</p>
        
        <h4>Top 5 Smartphones del 2024</h4>
        <ul>
          <li><strong>Samsung Galaxy S24 Ultra</strong> - Con IA integrada y S Pen</li>
          <li><strong>iPhone 15 Pro Max</strong> - Chip A17 Pro y titanio</li>
          <li><strong>Google Pixel 8 Pro</strong> - Mejor cámara computacional</li>
          <li><strong>OnePlus 12</strong> - Excelente relación calidad-precio</li>
          <li><strong>Xiaomi 14 Ultra</strong> - Fotografía profesional</li>
        </ul>

        <h4>Tendencias Principales</h4>
        <p>La inteligencia artificial se ha convertido en el centro de la experiencia del usuario. Desde asistencia contextual hasta procesamiento de imágenes en tiempo real, los smartphones de 2024 están redefiniendo lo que significa ser "inteligente".</p>

        <p>La duración de la batería también ha mejorado significativamente, con la mayoría de flagships ofreciendo más de 24 horas de uso moderado. Además, la carga rápida se ha estandarizado, permitiendo cargas completas en menos de 30 minutos.</p>
      `
    },
    {
      id: 2,
      title: 'Cómo elegir la laptop perfecta para tu trabajo',
      excerpt: 'Guía completa para seleccionar la laptop ideal según tus necesidades profesionales y de entretenimiento.',
      date: '10 Marzo 2024',
      author: 'María González',
      authorRole: 'Directora de Tecnología',
      authorAvatar: 'MG',
      image: '💻',
      category: 'Productividad',
      readTime: '7 min',
      content: `
        <h3>Encuentra Tu Laptop Ideal</h3>
        <p>Elegir la laptop correcta puede marcar la diferencia en tu productividad y experiencia de usuario. En esta guía te ayudamos a tomar la mejor decisión.</p>
        
        <h4>Según Tu Profesión</h4>
        <ul>
          <li><strong>Desarrolladores:</strong> Mínimo 16GB RAM, SSD rápido, buen teclado</li>
          <li><strong>Diseñadores:</strong> Pantalla de alta resolución, GPU dedicada, colores precisos</li>
          <li><strong>Estudiantes:</strong> Portabilidad, duración de batería, precio accesible</li>
          <li><strong>Ejecutivos:</strong> Diseño premium, seguridad, conectividad</li>
        </ul>

        <h4>Especificaciones Clave</h4>
        <p><strong>Procesador:</strong> Intel Core i5/i7 o AMD Ryzen 5/7 para la mayoría de usuarios. Los profesionales necesitan i9 o Ryzen 9.</p>
        <p><strong>RAM:</strong> 8GB como mínimo, 16GB recomendado, 32GB+ para trabajo pesado.</p>
        <p><strong>Almacenamiento:</strong> SSD de 512GB mínimo, NVMe para mayor velocidad.</p>

        <h4>Marcas Recomendadas</h4>
        <p>Apple MacBook para ecosistema integrado, Dell XPS para Windows premium, Lenovo ThinkPad para durabilidad, y ASUS para gaming/productividad.</p>
      `
    },
    {
      id: 3,
      title: 'Tendencias en gaming para 2024',
      excerpt: 'Descubre lo que viene en el mundo del gaming: nuevas consolas, periféricos y tecnologías emergentes.',
      date: '5 Marzo 2024',
      author: 'Carlos López',
      authorRole: 'Jefe de Ventas',
      authorAvatar: 'CL',
      image: '🎮',
      category: 'Gaming',
      readTime: '6 min',
      content: `
        <h3>El Futuro del Gaming</h3>
        <p>2024 promete ser un año emocionante para los gamers, con avances tecnológicos que transformarán la experiencia de juego.</p>
        
        <h4>Consolas de Nueva Generación</h4>
        <p>PS5 Pro y Xbox Series X Refresh están en el horizonte, prometiendo 8K nativo y tasas de refresco más altas. La competencia entre Sony y Microsoft sigue intensificándose.</p>

        <h4>Realidad Virtual y Aumentada</h4>
        <p>Meta Quest 3 y Apple Vision Pro están llevando el gaming inmersivo a nuevos niveles. Los juegos de realidad mixta permiten interactuar con el mundo real mientras juegas.</p>

        <h4>Gaming Cloud</h4>
        <p>Servicios como NVIDIA GeForce Now y Xbox Cloud Gaming están democratizando el acceso a juegos AAA sin necesidad de hardware costoso. La latencia sigue siendo el principal desafío.</p>

        <h4>eSports en Crecimiento</h4>
        <p>Los torneos profesionales continúan ganando audiencia, con premios que superan los millones de dólares. Juegos como Valorant, League of Legends y Counter-Strike 2 lideran la escena.</p>
      `
    },
    {
      id: 4,
      title: 'Audio profesional: ¿Qué audífonos necesitas?',
      excerpt: 'Comparativa de los mejores audífonos del mercado para diferentes usos y presupuestos.',
      date: '1 Marzo 2024',
      author: 'Ana Martínez',
      authorRole: 'Gerente de Marketing',
      authorAvatar: 'AM',
      image: '🎧',
      category: 'Audio',
      readTime: '8 min',
      content: `
        <h3>El Mundo del Audio de Alta Calidad</h3>
        <p>Elegir los audífonos correctos puede transformar completamente tu experiencia de audio. Te guiamos a través de las mejores opciones.</p>
        
        <h4>Por Tipo de Uso</h4>
        <ul>
          <li><strong>Estudio:</strong> Beyerdynamic DT 1990 Pro, Audio-Technica ATH-M50x</li>
          <li><strong>Gaming:</strong> SteelSeries Arctis Nova Pro, HyperX Cloud Alpha</li>
          <li><strong>Inalámbricos:</strong> Sony WH-1000XM5, Apple AirPods Max</li>
          <li><strong>Deportivos:</strong> Jaybird Vista 2, Beats Fit Pro</li>
        </ul>

        <h4>Tecnologías Clave</h4>
        <p><strong>Cancelación Activa de Ruido (ANC):</strong> Sony y Bose lideran esta tecnología, esencial para viajes y oficinas ruidosas.</p>
        <p><strong>Audio Espacial:</strong> Dolby Atmos y Sony 360 Reality Audio crean experiencias inmersivas tridimensionales.</p>
        <p><strong>Conectividad:</strong> Bluetooth 5.3 ofrece mayor estabilidad y menor consumo energético.</p>

        <h4>Consejos de Compra</h4>
        <p>Prueba siempre que sea posible, considera tu entorno de uso principal, y no subestimes la importancia de la comodidad para sesiones largas.</p>
      `
    },
    {
      id: 5,
      title: 'El auge de los wearables en 2024',
      excerpt: 'Cómo los relojes inteligentes y dispositivos wearables están transformando nuestra vida diaria.',
      date: '28 Febrero 2024',
      author: 'Diego Andrés',
      authorRole: 'CEO & Fundador',
      authorAvatar: 'DA',
      image: '⌚',
      category: 'Wearables',
      readTime: '5 min',
      content: `
        <h3>Wearables: Más Allá del Tiempo</h3>
        <p>Los dispositivos wearables han evolucionado de simples contadores de pasos a asistentes de salud integrales.</p>
        
        <h4>Monitoreo de Salud Avanzado</h4>
        <p>Apple Watch Series 9 y Samsung Galaxy Watch6 ahora incluyen ECG, oxímetro de pulso, y monitoreo de temperatura. Estas funciones están salvando vidas al detectar condiciones cardíacas temprano.</p>

        <h4>Integración con Ecosistemas</h4>
        <p>La sincronización perfecta entre teléfonos, tablets y wearables está creando experiencias de usuario fluidas. Apple, Samsung y Google están compitiendo ferozmente en este espacio.</p>

        <h4>Batería y Autonomía</h4>
        <p>Las mejoras en eficiencia energética permiten a dispositivos como el Garmin Venu 3 ofrecer hasta 14 días de autonomía. La carga rápida inalámbrica se está convirtiendo en estándar.</p>
      `
    },
    {
      id: 6,
      title: 'Tablets vs Laptops: ¿Cuál elegir en 2024?',
      excerpt: 'Análisis detallado sobre cuándo optar por una tablet y cuándo por una laptop según tus necesidades.',
      date: '25 Febrero 2024',
      author: 'María González',
      authorRole: 'Directora de Tecnología',
      authorAvatar: 'MG',
      image: '📟',
      category: 'Comparativas',
      readTime: '9 min',
      content: `
        <h3>La Gran Decisión: Tablet o Laptop</h3>
        <p>Con la convergencia de funcionalidades, la línea entre tablets y laptops se está desvaneciendo. Te ayudamos a elegir.</p>
        
        <h4>Ventajas de las Tablets</h4>
        <ul>
          <li>Portabilidad extrema y peso ligero</li>
          <li>Interfaz táctil intuitiva</li>
          <li>Batería de larga duración</li>
          <li>Ideal para consumo de contenido</li>
        </ul>

        <h4>Ventajas de las Laptops</h4>
        <ul>
          <li>Mayor potencia de procesamiento</li>
          <li>Teclado físico para productividad</li>
          <li>Compatibilidad con software profesional</li>
          <li>Múltiples puertos de conexión</li>
        </ul>

        <h4>Dispositivos Híbridos</h4>
        <p>Los convertibles como Microsoft Surface Pro 9 y Lenovo Yoga ofrecen lo mejor de ambos mundos, pero con compromisos en potencia y precio.</p>

        <h4>Nuestra Recomendación</h4>
        <p>Para trabajo serio: laptop. Para entretenimiento y movilidad: tablet. Para ambos: convertible premium.</p>
      `
    }
  ];

  return (
    <div className="blog-page">
      {/* Header - Coherente con las demás páginas */}
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
              <Link to="/blog" className="nav-link active">Blog</Link>
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
            <span className="current-category">Blog</span>
          </nav>
        </div>
      </section>

      {/* Hero Banner del Blog */}
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-content">
            <div className="blog-hero-text">
              <h1 className="blog-hero-title">Blog Technova</h1>
              <p className="blog-hero-subtitle">
                Descubre las últimas tendencias tecnológicas, reviews de productos y consejos expertos
              </p>
              <div className="blog-stats">
                <div className="blog-stat">
                  <div className="stat-number">{blogPosts.length}+</div>
                  <div className="stat-label">Artículos</div>
                </div>
                <div className="blog-stat">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Expertos</div>
                </div>
                <div className="blog-stat">
                  <div className="stat-number">2024</div>
                  <div className="stat-label">Actualizado</div>
                </div>
              </div>
            </div>
            <div className="blog-hero-visual">
              <div className="blog-icon">📝</div>
            </div>
          </div>
        </div>
      </section>

      <Container className="blog-content py-5">
        <Row className="mb-5">
          <Col>
            <div className="section-header text-center">
              <h2>Últimos Artículos</h2>
              <p className="section-subtitle">
                Mantente informado con nuestro contenido actualizado sobre tecnología y innovación
              </p>
            </div>
          </Col>
        </Row>
        
        <Row>
          {blogPosts.map(post => (
            <Col key={post.id} lg={6} className="mb-4">
              <Card className={`blog-card h-100 ${expandedPost === post.id ? 'expanded' : ''}`}>
                <div className="blog-card-header">
                  <div className="blog-image">
                    <div className="blog-image-icon">{post.image}</div>
                  </div>
                  <div className="blog-meta">
                    <Badge bg="primary" className="category-badge">{post.category}</Badge>
                    <div className="blog-date">{post.date}</div>
                  </div>
                </div>
                
                <Card.Body className="blog-card-body">
                  <div className="blog-author">
                    <div className="author-avatar">
                      {post.authorAvatar}
                    </div>
                    <div className="author-info">
                      <div className="author-name">{post.author}</div>
                      <div className="author-role">{post.authorRole}</div>
                    </div>
                    <div className="read-time">{post.readTime} lectura</div>
                  </div>
                  
                  <Card.Title className="blog-title">{post.title}</Card.Title>
                  <Card.Text className="blog-excerpt">{post.excerpt}</Card.Text>
                  
                  {expandedPost === post.id && (
                    <div className="blog-full-content">
                      <div 
                        dangerouslySetInnerHTML={{ __html: post.content }}
                        className="blog-content-text"
                      />
                      <div className="blog-tags">
                        <span className="blog-tag">Tecnología</span>
                        <span className="blog-tag">Innovación</span>
                        <span className="blog-tag">{post.category}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="blog-actions">
                    <button 
                      className={`btn ${expandedPost === post.id ? 'btn-outline-primary' : 'btn-primary'} btn-sm read-more-btn`}
                      onClick={() => toggleExpandPost(post.id)}
                    >
                      {expandedPost === post.id ? 'Leer menos' : 'Leer más'}
                    </button>
                    <div className="blog-social">
                      <button className="social-btn">👍</button>
                      <button className="social-btn">💬</button>
                      <button className="social-btn">📤</button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Newsletter Section */}
        <Row className="blog-newsletter mt-5">
          <Col>
            <Card className="newsletter-card">
              <Card.Body className="text-center">
                <div className="newsletter-icon">📧</div>
                <h3>Suscríbete a Nuestro Blog</h3>
                <p>Recibe los últimos artículos y actualizaciones tecnológicas directamente en tu email</p>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico" 
                    className="newsletter-input"
                  />
                  <button className="btn btn-primary newsletter-btn">Suscribirse</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Blog;