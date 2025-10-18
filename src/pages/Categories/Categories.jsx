import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Categories.css';

// Importar imágenes (ajusta las rutas según tu estructura)
import Macbook from "../../assets/img/macbook-pro-m2.png";
import iPhone from "../../assets/img/iphone15promax.png";
import Samsung from "../../assets/img/SAMSUNG-S24-ULTRA.png";
import Airpods from "../../assets/img/Apple_A.png";
import PlayStation from "../../assets/img/playstation-5.png";
import iPad from "../../assets/img/ipad-air.png";
import AppleWatch from "../../assets/img/apple-watch.png";
import SamsungTablet from "../../assets/img/samsung-tablet.png";
import Xbox from "../../assets/img/xbox-series-x.png";
import SonyHeadphones from "../../assets/img/sony-headphones.png";
import DellLaptop from "../../assets/img/dell-xps.png";
import GoogleWatch from "../../assets/img/google-watch.png";

const Categories = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const { categoryName } = useParams();
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

  // Datos de productos con imágenes reales
  useEffect(() => {
    const allProducts = [
      {
        id: 1,
        name: "MacBook Pro 16\" M2 Pro",
        category: "laptops",
        price: 2499990,
        image: Macbook,
        imageUrl: Macbook,
        description: "Laptop profesional con chip M2 Pro, 16GB RAM, 1TB SSD",
        badge: "Nuevo",
        badgeVariant: "success",
        specs: ["Chip M2 Pro", "16GB RAM", "1TB SSD", "Pantalla 16\"", "macOS"],
        brand: "Apple"
      },
      {
        id: 2,
        name: "iPhone 15 Pro Max",
        category: "smartphones", 
        price: 1499990,
        image: iPhone,
        imageUrl: iPhone,
        description: "iPhone flagship con cámara profesional y titanio",
        badge: "Popular",
        badgeVariant: "primary",
        specs: ["Chip A17 Pro", "256GB", "Cámara 48MP", "Titanio", "5G"],
        brand: "Apple"
      },
      {
        id: 3,
        name: "Samsung Galaxy S24 Ultra",
        category: "smartphones",
        price: 1199990,
        image: Samsung,
        imageUrl: Samsung,
        description: "Android premium con IA integrada y S Pen", 
        badge: "Destacado",
        badgeVariant: "warning",
        specs: ["Snapdragon 8 Gen 3", "512GB", "S Pen", "Cámara 200MP", "IA"],
        brand: "Samsung"
      },
      {
        id: 4,
        name: "AirPods Pro 2da Generación",
        category: "audio",
        price: 349990,
        image: Airpods,
        imageUrl: Airpods,
        description: "Audífonos con cancelación activa de ruido",
        badge: "Oferta", 
        badgeVariant: "accent",
        specs: ["Cancelación activa", "Audio espacial", "Carga MagSafe", "Resistente al agua"],
        brand: "Apple"
      },
      {
        id: 5,
        name: "PlayStation 5",
        category: "gaming",
        price: 699990,
        image: PlayStation,
        imageUrl: PlayStation,
        description: "Consola de última generación con 4K y 120fps",
        badge: "Nuevo",
        badgeVariant: "success",
        specs: ["825GB SSD", "4K 120fps", "Ray Tracing", "Compatibilidad PS4"],
        brand: "Sony"
      },
      {
        id: 6,
        name: "iPad Air 5ta Gen",
        category: "tablets",
        price: 899990,
        image: iPad,
        imageUrl: iPad,
        description: "Tablet potente con chip M1 y pantalla Liquid Retina",
        badge: "Popular",
        badgeVariant: "primary",
        specs: ["Chip M1", "10.9\" Liquid Retina", "5G", "Apple Pencil 2"],
        brand: "Apple"
      },
      {
        id: 7,
        name: "Apple Watch Series 9",
        category: "wearables",
        price: 499990,
        image: AppleWatch,
        imageUrl: AppleWatch,
        description: "Reloj inteligente con monitorización avanzada",
        badge: "Nuevo",
        badgeVariant: "success",
        specs: ["Pantalla Retina", "GPS", "Resistente al agua", "Monitor sueño"],
        brand: "Apple"
      },
      {
        id: 8,
        name: "Samsung Galaxy Tab S9",
        category: "tablets",
        price: 799990,
        image: SamsungTablet,
        imageUrl: SamsungTablet,
        description: "Tablet Android premium con S Pen incluido",
        badge: "Oferta",
        badgeVariant: "accent",
        specs: ["Snapdragon 8 Gen 2", "S Pen incluido", "AMOLED 120Hz", "5G"],
        brand: "Samsung"
      },
      {
        id: 9,
        name: "Xbox Series X",
        category: "gaming",
        price: 599990,
        image: Xbox,
        imageUrl: Xbox,
        description: "Consola más potente con 4K y Game Pass",
        badge: "Destacado",
        badgeVariant: "warning",
        specs: ["1TB SSD", "4K 120fps", "Game Pass", "Retrocompatibilidad"],
        brand: "Microsoft"
      },
      {
        id: 10,
        name: "Sony WH-1000XM5",
        category: "audio",
        price: 399990,
        image: SonyHeadphones,
        imageUrl: SonyHeadphones,
        description: "Audífonos con mejor cancelación de ruido del mercado",
        badge: "Popular",
        badgeVariant: "primary",
        specs: ["Cancelación líder", "30h batería", "Carga rápida", "Asistente voz"],
        brand: "Sony"
      },
      {
        id: 11,
        name: "Dell XPS 13",
        category: "laptops",
        price: 1299990,
        image: DellLaptop,
        imageUrl: DellLaptop,
        description: "Laptop ultraportátil con pantalla InfinityEdge",
        badge: "Oferta",
        badgeVariant: "accent",
        specs: ["Intel i7", "16GB RAM", "512GB SSD", "13.4\" 4K"],
        brand: "Dell"
      },
      {
        id: 12,
        name: "Google Pixel Watch 2",
        category: "wearables",
        price: 349990,
        image: GoogleWatch,
        imageUrl: GoogleWatch,
        description: "Reloj inteligente con Fitbit integrado",
        badge: "Nuevo",
        badgeVariant: "success",
        specs: ["Fitbit integrado", "24h batería", "Android Wear", "GPS"],
        brand: "Google"
      }
    ];

    setProducts(allProducts);
  }, []);

  // Filtrar productos por categoría y otros filtros
  useEffect(() => {
    let filtered = products;

    // Filtro por categoría
    if (categoryName) {
      setSelectedCategory(categoryName);
      filtered = filtered.filter(product => product.category === categoryName);
    } else {
      setSelectedCategory('');
    }

    // Filtro por precio
    if (priceFilter) {
      switch (priceFilter) {
        case 'Hasta $500.000':
          filtered = filtered.filter(product => product.price <= 500000);
          break;
        case '$500.000 - $1.000.000':
          filtered = filtered.filter(product => product.price > 500000 && product.price <= 1000000);
          break;
        case 'Más de $1.000.000':
          filtered = filtered.filter(product => product.price > 1000000);
          break;
        default:
          break;
      }
    }

    // Filtro por marca
    if (brandFilter && brandFilter !== 'Todas las marcas') {
      filtered = filtered.filter(product => product.brand === brandFilter);
    }

    setFilteredProducts(filtered);
  }, [categoryName, products, priceFilter, brandFilter]);

  // Categorías disponibles
  const categories = [
    {
      name: "smartphones",
      displayName: "Smartphones",
      icon: "📱",
      description: "Los últimos modelos con tecnología avanzada"
    },
    {
      name: "laptops",
      displayName: "Laptops",
      icon: "💻",
      description: "Potencia y portabilidad para trabajo y gaming"
    },
    {
      name: "audio",
      displayName: "Audio",
      icon: "🎧",
      description: "Audífonos y equipos de sonido premium"
    },
    {
      name: "gaming",
      displayName: "Gaming",
      icon: "🎮",
      description: "Consolas y accesorios para gamers"
    },
    {
      name: "tablets",
      displayName: "Tablets",
      icon: "📟",
      description: "Tablets para trabajo y entretenimiento"
    },
    {
      name: "wearables",
      displayName: "Wearables",
      icon: "⌚",
      description: "Relojes inteligentes y dispositivos wearables"
    }
  ];

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

  // Manejar cambio de filtro de precio
  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
  };

  // Manejar cambio de filtro de marca
  const handleBrandFilterChange = (e) => {
    setBrandFilter(e.target.value);
  };

  // Resetear filtros
  const handleResetFilters = () => {
    setPriceFilter('');
    setBrandFilter('');
  };

  return (
    <div className="categories-page">
      {/* Header - Corregido para que coincida con Home */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Technova</h1>
            </div>
            <nav className="main-nav">
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/categories" className="nav-link active">Categorías</Link>
              <Link to="/offers" className="nav-link">Ofertas</Link>
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
            <span>Categorías</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="current-category">
                  {categories.find(cat => cat.name === selectedCategory)?.displayName}
                </span>
              </>
            )}
          </nav>
          {/* Filtros activos */}
          {(priceFilter || brandFilter) && (
            <div className="active-filters">
              <span>Filtros activos:</span>
              {priceFilter && <span className="filter-tag">Precio: {priceFilter}</span>}
              {brandFilter && <span className="filter-tag">Marca: {brandFilter}</span>}
              <button onClick={handleResetFilters} className="btn btn-outline btn-sm">
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="categories-main-section">
        <div className="container">
          <div className="categories-layout">
            {/* Sidebar de categorías */}
            <aside className="categories-sidebar">
              <h3>Categorías</h3>
              <div className="categories-list">
                <Link 
                  to="/categories" 
                  className={`category-filter ${!selectedCategory ? 'active' : ''}`}
                >
                  <span className="category-icon">🏠</span>
                  <span>Todas las categorías</span>
                </Link>
                {categories.map(category => (
                  <Link 
                    key={category.name}
                    to={`/categories/${category.name}`}
                    className={`category-filter ${selectedCategory === category.name ? 'active' : ''}`}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span>{category.displayName}</span>
                    <span className="product-count">
                      ({products.filter(p => p.category === category.name).length})
                    </span>
                  </Link>
                ))}
              </div>

              {/* Filtros adicionales */}
              <div className="filters-section">
                <h4>Filtros</h4>
                <div className="filter-group">
                  <label>Precio</label>
                  <select 
                    className="filter-select"
                    value={priceFilter}
                    onChange={handlePriceFilterChange}
                  >
                    <option value="">Todos los precios</option>
                    <option value="Hasta $500.000">Hasta $500.000</option>
                    <option value="$500.000 - $1.000.000">$500.000 - $1.000.000</option>
                    <option value="Más de $1.000.000">Más de $1.000.000</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Marca</label>
                  <select 
                    className="filter-select"
                    value={brandFilter}
                    onChange={handleBrandFilterChange}
                  >
                    <option value="">Todas las marcas</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Sony">Sony</option>
                    <option value="Dell">Dell</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Google">Google</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Grid de productos */}
            <main className="products-main">
              <div className="products-header">
                <h1>
                  {selectedCategory 
                    ? categories.find(cat => cat.name === selectedCategory)?.displayName
                    : 'Todos los Productos'
                  }
                </h1>
                <p className="products-count">
                  {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="products-grid">
                {filteredProducts.map(product => (
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
                      
                      {/* Especificaciones */}
                      <div className="product-specs">
                        {product.specs.slice(0, 3).map((spec, index) => (
                          <span key={index} className="spec-tag">{spec}</span>
                        ))}
                      </div>
                      
                      <div className="product-price">${product.price.toLocaleString()}</div>
                      <div className="product-actions">
                        <button
                          className="btn btn-primary btn-sm add-to-cart-btn"
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

              {filteredProducts.length === 0 && (
                <div className="no-products">
                  <div className="no-products-icon">😔</div>
                  <h3>No se encontraron productos</h3>
                  <p>Intenta con otra categoría o ajusta los filtros</p>
                  <button onClick={handleResetFilters} className="btn btn-primary">
                    Limpiar Filtros
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;