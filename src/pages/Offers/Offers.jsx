import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Offers.css';

import Macbook from "../../assets/img/macbook-pro-m2.png";
import Samsung from "../../assets/img/SAMSUNG-S24-ULTRA.png";
import Airpods from "../../assets/img/Apple_A.png";
import PlayStation from "../../assets/img/playstation-5.png";
import SamsungTablet from "../../assets/img/samsung-tablet.png";
import Xbox from "../../assets/img/xbox-series-x.png";
import SonyHeadphones from "../../assets/img/sony-headphones.png";
import DellLaptop from "../../assets/img/dell-xps.png";

const Offers = ({ onAddToCart, onViewDetails }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Datos de productos en oferta
  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      const offersData = [
        {
          id: 1,
          name: "MacBook Pro 16\" M2 Pro",
          category: "laptops",
          originalPrice: 2999990,
          price: 2499990,
          discount: 17,
          image: Macbook,
          imageUrl: Macbook,
          description: "Laptop profesional con chip M2 Pro, 16GB RAM, 1TB SSD",
          badge: "Oferta Especial",
          badgeVariant: "danger",
          specs: ["Chip M2 Pro", "16GB RAM", "1TB SSD", "Pantalla 16\"", "macOS"],
          brand: "Apple",
          timeLeft: "2d 5h 30m",
          stock: 5
        },
        {
          id: 3,
          name: "Samsung Galaxy S24 Ultra",
          category: "smartphones",
          originalPrice: 1399990,
          price: 1199990,
          discount: 14,
          image: Samsung,
          imageUrl: Samsung,
          description: "Android premium con IA integrada y S Pen", 
          badge: "Flash Sale",
          badgeVariant: "danger",
          specs: ["Snapdragon 8 Gen 3", "512GB", "S Pen", "Cámara 200MP", "IA"],
          brand: "Samsung",
          timeLeft: "1d 12h 15m",
          stock: 8
        },
        {
          id: 4,
          name: "AirPods Pro 2da Generación",
          category: "audio",
          originalPrice: 449990,
          price: 349990,
          discount: 22,
          image: Airpods,
          imageUrl: Airpods,
          description: "Audífonos con cancelación activa de ruido",
          badge: "Más Vendido", 
          badgeVariant: "warning",
          specs: ["Cancelación activa", "Audio espacial", "Carga MagSafe", "Resistente al agua"],
          brand: "Apple",
          timeLeft: "3d 8h 45m",
          stock: 15
        },
        {
          id: 8,
          name: "Samsung Galaxy Tab S9",
          category: "tablets",
          originalPrice: 999990,
          price: 799990,
          discount: 20,
          image: SamsungTablet,
          imageUrl: SamsungTablet,
          description: "Tablet Android premium con S Pen incluido",
          badge: "Oferta",
          badgeVariant: "accent",
          specs: ["Snapdragon 8 Gen 2", "S Pen incluido", "AMOLED 120Hz", "5G"],
          brand: "Samsung",
          timeLeft: "5d 2h 10m",
          stock: 12
        },
        {
          id: 10,
          name: "Sony WH-1000XM5",
          category: "audio",
          originalPrice: 499990,
          price: 399990,
          discount: 20,
          image: SonyHeadphones,
          imageUrl: SonyHeadphones,
          description: "Audífonos con mejor cancelación de ruido del mercado",
          badge: "Popular",
          badgeVariant: "primary",
          specs: ["Cancelación líder", "30h batería", "Carga rápida", "Asistente voz"],
          brand: "Sony",
          timeLeft: "6d 14h 20m",
          stock: 7
        },
        {
          id: 11,
          name: "Dell XPS 13",
          category: "laptops",
          originalPrice: 1599990,
          price: 1299990,
          discount: 19,
          image: DellLaptop,
          imageUrl: DellLaptop,
          description: "Laptop ultraportátil con pantalla InfinityEdge",
          badge: "Oferta Relámpago",
          badgeVariant: "danger",
          specs: ["Intel i7", "16GB RAM", "512GB SSD", "13.4\" 4K"],
          brand: "Dell",
          timeLeft: "1d 3h 55m",
          stock: 3
        },
        {
          id: 5,
          name: "PlayStation 5",
          category: "gaming",
          originalPrice: 799990,
          price: 699990,
          discount: 13,
          image: PlayStation,
          imageUrl: PlayStation,
          description: "Consola de última generación con 4K y 120fps",
          badge: "Nuevo",
          badgeVariant: "success",
          specs: ["825GB SSD", "4K 120fps", "Ray Tracing", "Compatibilidad PS4"],
          brand: "Sony",
          timeLeft: "4d 7h 30m",
          stock: 6
        },
        {
          id: 9,
          name: "Xbox Series X",
          category: "gaming",
          originalPrice: 699990,
          price: 599990,
          discount: 14,
          image: Xbox,
          imageUrl: Xbox,
          description: "Consola más potente con 4K y Game Pass",
          badge: "Destacado",
          badgeVariant: "warning",
          specs: ["1TB SSD", "4K 120fps", "Game Pass", "Retrocompatibilidad"],
          brand: "Microsoft",
          timeLeft: "2d 10h 5m",
          stock: 9
        }
      ];

      setOffers(offersData);
      setLoading(false);
    }, 1000);
  }, []);

  // Función para manejar agregar al carrito
  const handleAddToCart = (product) => {
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      navigate('/login');
      return;
    }

    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    alert('Producto agregado al carrito');
  };

  // Función para manejar cierre de sesión
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCart([]);
    localStorage.removeItem('cart');
    alert('Sesión cerrada correctamente');
    window.location.reload();
  };

  // Función para ver detalles del producto
  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Calcular ahorro
  const calculateSavings = (originalPrice, currentPrice) => {
    return originalPrice - currentPrice;
  };

  return (
    <div className="offers-page">
      {/* Header - Coherente con Home y Categories */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Technova</h1>
            </div>
            <nav className="main-nav">
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/categories" className="nav-link">Categorías</Link>
              <Link to="/offers" className="nav-link active">Ofertas</Link>
              <Link to="/about" className="nav-link">Nosotros</Link>
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
            <span className="current-category">Ofertas Especiales</span>
          </nav>
        </div>
      </section>

      {/* Hero Banner de Ofertas */}
      <section className="offers-hero">
        <div className="container">
          <div className="offers-hero-content">
            <div className="offers-hero-text">
              <div className="hero-badge">
                <span className="badge badge-danger">🔥 OFERTAS LIMITADAS</span>
              </div>
              <h1 className="offers-hero-title">
                Descuentos <span className="text-accent">Exclusivos</span> en Technova
              </h1>
              <p className="offers-hero-description">
                Aprovecha nuestras ofertas por tiempo limitado. Productos de calidad con descuentos increíbles. 
                ¡No dejes pasar esta oportunidad!
              </p>
              <div className="offers-stats">
                <div className="offer-stat">
                  <div className="stat-number">{offers.length}</div>
                  <div className="stat-label">Productos en Oferta</div>
                </div>
                <div className="offer-stat">
                  <div className="stat-number">30%</div>
                  <div className="stat-label">Descuento Máximo</div>
                </div>
                <div className="offer-stat">
                  <div className="stat-number">⏰</div>
                  <div className="stat-label">Tiempo Limitado</div>
                </div>
              </div>
            </div>
            <div className="offers-hero-visual">
              <div className="discount-bubble large">-30%</div>
              <div className="discount-bubble medium">-20%</div>
              <div className="discount-bubble small">-15%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="offers-main-section">
        <div className="container">
          {loading ? (
            <div className="loading-offers">
              <div className="loading-spinner"></div>
              <p>Cargando ofertas especiales...</p>
            </div>
          ) : (
            <>
              <div className="offers-header">
                <h2>Ofertas Destacadas</h2>
                <p className="offers-subtitle">
                  Productos seleccionados con los mejores descuentos del momento
                </p>
              </div>

              <div className="offers-grid">
                {offers.map(product => (
                  <div key={product.id} className="offer-card">
                    <div className="offer-badge">
                      <span className={`badge badge-${product.badgeVariant}`}>
                        {product.badge}
                      </span>
                      <div className="discount-percent">-{product.discount}%</div>
                    </div>
                    
                    <div className="product-image">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="product-img" />
                      ) : (
                        <div className="product-placeholder">{product.image}</div>
                      )}
                    </div>

                    <div className="product-content">
                      <div className="product-category">{product.category}</div>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      
                      {/* Especificaciones */}
                      <div className="product-specs">
                        {product.specs.slice(0, 2).map((spec, index) => (
                          <span key={index} className="spec-tag">{spec}</span>
                        ))}
                      </div>

                      {/* Precios */}
                      <div className="price-section">
                        <div className="original-price">${product.originalPrice.toLocaleString()}</div>
                        <div className="current-price">${product.price.toLocaleString()}</div>
                        <div className="savings">
                          Ahorras: ${calculateSavings(product.originalPrice, product.price).toLocaleString()}
                        </div>
                      </div>

                      {/* Información adicional */}
                      <div className="offer-info">
                        <div className="time-left">
                          ⏰ {product.timeLeft}
                        </div>
                        <div className="stock-info">
                          📦 {product.stock} disponibles
                        </div>
                      </div>

                      <div className="product-actions">
                        <button
                          className="btn btn-danger btn-sm add-to-cart-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Agregar al Carrito
                        </button>
                        <button
                          className="btn btn-outline btn-sm view-details-btn"
                          onClick={() => handleViewDetails(product)}
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {offers.length === 0 && (
                <div className="no-offers">
                  <div className="no-offers-icon">🎁</div>
                  <h3>No hay ofertas disponibles en este momento</h3>
                  <p>Vuelve pronto para descubrir nuevas promociones</p>
                  <Link to="/categories" className="btn btn-primary">
                    Ver Todos los Productos
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Banner de Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>¡No te pierdas nuestras ofertas!</h3>
              <p>Suscríbete y recibe las mejores promociones directamente en tu email</p>
            </div>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="newsletter-input"
              />
              <button className="btn newsletter-btn">Suscribirse</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offers;