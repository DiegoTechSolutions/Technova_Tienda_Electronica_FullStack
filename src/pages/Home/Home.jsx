import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Macbook from "../../assets/img/macbook-pro-m2.png";
import iPhone from "../../assets/img/iphone15promax.png";
import Samsung from "../../assets/img/SAMSUNG-S24-ULTRA.png";
import Airpods from "../../assets/img/Apple_A.png";



const Home = ({ onAddToCart = () => {}, onViewDetails = () => {} }) => {
  //Productos destacados
  const featuredProducts = [
  {
    id: 1,
    name: "MacBook Pro 16\" M2 Pro",
    category: "laptops",
    price: 2499990,
    image: "💻",
    imageUrl: Macbook,
    description: "Laptop profesional con chip M2 Pro, 16GB RAM, 1TB SSD",
    badge: "Nuevo",
    badgeVariant: "success"
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    category: "smartphones", 
    price: 1499990,
    image: "📱",
    imageUrl: iPhone, // Imagen local
    description: "iPhone flagship con cámara profesional y titanio",
    badge: "Popular",
    badgeVariant: "primary"
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    category: "smartphones",
    price: 1199990,
    image: "📱",
    imageUrl: Samsung, // Imagen local
    description: "Android premium con IA integrada y S Pen", 
    badge: "Destacado",
    badgeVariant: "warning"
  },
  {
    id: 5,
    name: "AirPods Pro 2da Generación",
    category: "audio",
    price: 349990,
    image: "🎧",
    imageUrl: Airpods, // Imagen local
    description: "Audífonos con cancelación activa de ruido",
    badge: "Oferta", 
    badgeVariant: "accent"
  }
];

  const categories = [
    {
      name: "Smartphones",
      icon: "📱",
      description: "Los últimos modelos con tecnología avanzada",
      link: "/categories",
    },
    {
      name: "Laptops",
      icon: "💻",
      description: "Potencia y portabilidad para trabajo y gaming",
      link: "/categories",
    },
    {
      name: "Audio",
      icon: "🎧",
      description: "Audífonos y equipos de sonido premium",
      link: "/categories",
    },
    {
      name: "Gaming",
      icon: "🎮",
      description: "Consolas y accesorios para gamers",
      link: "/categories",
    },
    {
      name: "Tablets",
      icon: "📟",
      description: "Tablets para trabajo y entretenimiento",
      link: "/categories",
    },
    {
      name: "Wearables",
      icon: "⌚",
      description: "Relojes inteligentes y dispositivos wearables",
      link: "/categories",
    }
  ];

  const quickLinks = [
    {
      title: "Ofertas Especiales",
      description: "Hasta 50% de descuento en productos seleccionados",
      icon: "🔥",
      link: "/offers",
      buttonText: "Ver Ofertas",
      variant: "accent"
    },
    {
      title: "Envío Gratis",
      description: "En compras superiores a $500.000 en todo Chile",
      icon: "🚚",
      link: "/shipping",
      buttonText: "Más Info",
      variant: "primary"
    },
    {
      title: "12 Cuotas Sin Interés",
      description: "Con todas las tarjetas de crédito participantes",
      icon: "💳",
      link: "/payment",
      buttonText: "Ver Planes",
      variant: "success"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge badge-primary">Tecnología de Vanguardia</span>
              </div>
              <h1 className="hero-title">
                Descubre la <span className="text-brand">Innovación</span> en Technova
              </h1>
              <p className="hero-description">
                Los mejores productos tecnológicos con garantía oficial, 
                envío express y soporte especializado. 
                Más de 10,000 clientes satisfechos en todo Chile.
              </p>
              <div className="hero-actions">
                <Link to="/categories" className="btn btn-primary btn-lg">
                  Comprar Ahora
                </Link>
                <Link to="/offers" className="btn btn-outline btn-lg">
                  Ver Ofertas
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">10K+</div>
                  <div className="stat-label">Clientes</div>
                </div>
                <div className="stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Productos</div>
                </div>
                <div className="stat">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Soporte</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            {quickLinks.map((link, index) => (
              <div key={index} className="quick-link-card">
                <div className="quick-link-icon">{link.icon}</div>
                <div className="quick-link-content">
                  <h3 className="quick-link-title">{link.title}</h3>
                  <p className="quick-link-description">{link.description}</p>
                </div>
                <Link to={link.link} className={`btn btn-${link.variant} btn-sm`}>
                  {link.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products-section">
        <div className="container">
          <div className="section-header">
            <h2>Productos Destacados</h2>
            <p className="section-subtitle">
              Los productos más populares y mejor valorados por nuestra comunidad
            </p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="product-img" />
                  ) : (
                    <div className="product-placeholder">{product.image}</div>
                  )}
                  <div className="product-badge">
                    <span className={`badge badge-${product.badgeVariant}`}>
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="product-content">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-price">${product.price.toLocaleString()}</div>
                  <div className="product-actions">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onAddToCart(product)}
                    >
                      Agregar al Carrito
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => onViewDetails(product)}
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/categories" className="btn btn-outline">
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Explora por Categorías</h2>
            <p className="section-subtitle">
              Encuentra exactamente lo que necesitas en nuestras categorías especializadas
            </p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link to={category.link} key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                </div>
                <div className="category-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">🚀</div>
              <h4>Envío Express</h4>
              <p>Recibe tu pedido en 24-48 horas en todo Chile</p>
            </div>
            <div className="info-item">
              <div className="info-icon">🛡️</div>
              <h4>Garantía Extendida</h4>
              <p>Hasta 2 años de garantía en todos nuestros productos</p>
            </div>
            <div className="info-item">
              <div className="info-icon">💎</div>
              <h4>Calidad Premium</h4>
              <p>Productos 100% originales con certificación oficial</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;