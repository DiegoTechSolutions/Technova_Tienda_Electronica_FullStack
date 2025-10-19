import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getCategories,
  getOrders,
  getUsers,
  getAdminStats,
  updateOrderStatus,
  addCategory,
  updateCategory,
  deleteCategory
} from '../../data/database';
import './Admin.css';

const Admin = ({ user, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate]);

  const loadData = () => {
    setProducts(getProducts());
    setCategories(getCategories());
    setOrders(getOrders());
    setUsers(getUsers());
    setStats(getAdminStats());
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    loadData();
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, categoryData);
    } else {
      addCategory(categoryData);
    }
    loadData();
    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(productId);
      loadData();
    }
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      deleteCategory(categoryId);
      loadData();
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    loadData();
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-page">
      {/* Header */}
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
              <div className="user-info">
                <span className="welcome-text">Bienvenido, {user.name}</span>
                <button onClick={onLogout} className="btn btn-outline btn-sm logout-btn">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <h3>Panel Admin</h3>
            <p>Sistema de Gestión Technova</p>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-item ${activeSection === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveSection('orders')}
            >
              📦 Órdenes
            </button>
            <button 
              className={`nav-item ${activeSection === 'products' ? 'active' : ''}`}
              onClick={() => setActiveSection('products')}
            >
              🛍️ Productos
            </button>
            <button 
              className={`nav-item ${activeSection === 'categories' ? 'active' : ''}`}
              onClick={() => setActiveSection('categories')}
            >
              📑 Categorías
            </button>
            <button 
              className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
              onClick={() => setActiveSection('users')}
            >
              👥 Usuarios
            </button>
            <button 
              className={`nav-item ${activeSection === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveSection('reports')}
            >
              📈 Reportes
            </button>
            <button 
              className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveSection('profile')}
            >
              👤 Perfil
            </button>
          </nav>

          <div className="sidebar-footer">
            <div className="store-info">
              <strong>Technova Store</strong>
              <span>Sistema Administrativo</span>
            </div>
            <button onClick={onLogout} className="btn btn-danger btn-sm btn-block">
              Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          {/* Dashboard */}
          {activeSection === 'dashboard' && (
            <DashboardSection 
              stats={stats}
              onNavigate={setActiveSection}
            />
          )}

          {/* Orders */}
          {activeSection === 'orders' && (
            <OrdersSection 
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              getStatusVariant={getStatusVariant}
            />
          )}

          {/* Products */}
          {activeSection === 'products' && (
            <ProductsSection 
              products={products}
              categories={categories}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
              onAddProduct={() => setShowProductModal(true)}
            />
          )}

          {/* Categories */}
          {activeSection === 'categories' && (
            <CategoriesSection 
              categories={categories}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              onAddCategory={() => setShowCategoryModal(true)}
            />
          )}

          {/* Users */}
          {activeSection === 'users' && (
            <UsersSection users={users} />
          )}

          {/* Reports */}
          {activeSection === 'reports' && (
            <ReportsSection stats={stats} orders={orders} />
          )}

          {/* Profile */}
          {activeSection === 'profile' && (
            <ProfileSection user={user} />
          )}
        </main>
      </div>

      {/* Product Modal */}
      <ProductModal 
        show={showProductModal}
        onHide={() => {
          setShowProductModal(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={categories}
      />

      {/* Category Modal */}
      <CategoryModal 
        show={showCategoryModal}
        onHide={() => {
          setShowCategoryModal(false);
          setEditingCategory(null);
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </div>
  );
};

// Componentes de las secciones
const DashboardSection = ({ stats, onNavigate }) => (
  <div className="dashboard-section">
    <div className="section-header">
      <h1>Dashboard</h1>
      <p>Resumen general del sistema Technova</p>
    </div>

    <div className="stats-grid">
      <div className="stat-card primary">
        <div className="stat-icon">🛒</div>
        <div className="stat-info">
          <div className="stat-number">{stats.totalOrders || 0}</div>
          <div className="stat-label">Órdenes Totales</div>
          <div className="stat-trend">+12% este mes</div>
        </div>
      </div>

      <div className="stat-card success">
        <div className="stat-icon">📦</div>
        <div className="stat-info">
          <div className="stat-number">{stats.totalProducts || 0}</div>
          <div className="stat-label">Productos</div>
          <div className="stat-trend">Inventario: {stats.totalProducts || 0}</div>
        </div>
      </div>

      <div className="stat-card warning">
        <div className="stat-icon">👥</div>
        <div className="stat-info">
          <div className="stat-number">{stats.totalUsers || 0}</div>
          <div className="stat-label">Usuarios</div>
          <div className="stat-trend">+{Math.floor((stats.totalUsers || 0) * 0.1)} este mes</div>
        </div>
      </div>

      <div className="stat-card info">
        <div className="stat-icon">💰</div>
        <div className="stat-info">
          <div className="stat-number">${(stats.totalRevenue || 0).toLocaleString()}</div>
          <div className="stat-label">Ingresos Totales</div>
          <div className="stat-trend">+8% este mes</div>
        </div>
      </div>
    </div>

    <div className="quick-actions">
      <h3>Accesos Rápidos</h3>
      <div className="actions-grid">
        <button onClick={() => onNavigate('orders')} className="action-card">
          <div className="action-icon">📦</div>
          <div className="action-text">Órdenes</div>
        </button>
        <button onClick={() => onNavigate('products')} className="action-card">
          <div className="action-icon">🛍️</div>
          <div className="action-text">Productos</div>
        </button>
        <button onClick={() => onNavigate('categories')} className="action-card">
          <div className="action-icon">📑</div>
          <div className="action-text">Categorías</div>
        </button>
        <button onClick={() => onNavigate('users')} className="action-card">
          <div className="action-icon">👥</div>
          <div className="action-text">Usuarios</div>
        </button>
        <button onClick={() => onNavigate('reports')} className="action-card">
          <div className="action-icon">📈</div>
          <div className="action-text">Reportes</div>
        </button>
        <button onClick={() => onNavigate('profile')} className="action-card">
          <div className="action-icon">👤</div>
          <div className="action-text">Perfil</div>
        </button>
      </div>
    </div>
  </div>
);

const OrdersSection = ({ orders, onUpdateOrderStatus, getStatusVariant }) => (
  <div className="orders-section">
    <div className="section-header">
      <h1>Gestión de Órdenes</h1>
      <p>Administra y actualiza el estado de las órdenes</p>
    </div>

    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Orden #</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.orderNumber}</td>
              <td>{order.customer?.nombre} {order.customer?.apellido}</td>
              <td>{order.customer?.email}</td>
              <td>${order.total?.toLocaleString()}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                <span className={`status-badge ${getStatusVariant(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pendiente</option>
                  <option value="completed">Completado</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No hay órdenes</h3>
          <p>No se han registrado órdenes aún</p>
        </div>
      )}
    </div>
  </div>
);

const ProductsSection = ({ products, categories, onEditProduct, onDeleteProduct, onAddProduct }) => (
  <div className="products-section">
    <div className="section-header">
      <div className="header-content">
        <div>
          <h1>Gestión de Productos</h1>
          <p>Administra el inventario de productos</p>
        </div>
        <button onClick={onAddProduct} className="btn btn-primary">
          + Agregar Producto
        </button>
      </div>
    </div>

    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <div className="product-info">
                  <div className="product-image">
                    {product.image}
                  </div>
                  <div className="product-details">
                    <div className="product-name">{product.name}</div>
                    <div className="product-description">{product.description}</div>
                  </div>
                </div>
              </td>
              <td>${product.price.toLocaleString()}</td>
              <td>
                <span className="category-tag">{product.category}</span>
              </td>
              <td>{product.stock}</td>
              <td>
                <span className={`status-badge ${product.inStock ? 'success' : 'danger'}`}>
                  {product.inStock ? 'En Stock' : 'Agotado'}
                </span>
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    onClick={() => onEditProduct(product)}
                    className="btn btn-outline btn-sm"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onDeleteProduct(product.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🛍️</div>
          <h3>No hay productos</h3>
          <p>Agrega productos para comenzar</p>
          <button onClick={onAddProduct} className="btn btn-primary">
            Agregar Primer Producto
          </button>
        </div>
      )}
    </div>
  </div>
);

const CategoriesSection = ({ categories, onEditCategory, onDeleteCategory, onAddCategory }) => (
  <div className="categories-section">
    <div className="section-header">
      <div className="header-content">
        <div>
          <h1>Gestión de Categorías</h1>
          <p>Administra las categorías de productos</p>
        </div>
        <button onClick={onAddCategory} className="btn btn-primary">
          + Nueva Categoría
        </button>
      </div>
    </div>

    <div className="categories-grid">
      {categories.map(category => (
        <div key={category.id} className="category-card">
          <div className="category-header">
            <div className="category-icon">{category.icon}</div>
            <div className="category-actions">
              <button 
                onClick={() => onEditCategory(category)}
                className="btn btn-outline btn-sm"
              >
                Editar
              </button>
              <button 
                onClick={() => onDeleteCategory(category.id)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
          <div className="category-content">
            <h3 className="category-name">{category.name}</h3>
            <p className="category-description">{category.description}</p>
            <div className="category-stats">
              <span className="product-count">{category.productCount} productos</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {categories.length === 0 && (
      <div className="empty-state">
        <div className="empty-icon">📑</div>
        <h3>No hay categorías</h3>
        <p>Crea categorías para organizar tus productos</p>
        <button onClick={onAddCategory} className="btn btn-primary">
          Crear Primera Categoría
        </button>
      </div>
    )}
  </div>
);

const UsersSection = ({ users }) => (
  <div className="users-section">
    <div className="section-header">
      <h1>Gestión de Usuarios</h1>
      <p>Administra los usuarios del sistema</p>
    </div>

    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Registro</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <div className="user-info">
                  <div className="user-avatar">
                    {user.avatar}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${user.role === 'admin' ? 'admin' : 'user'}`}>
                  {user.role}
                </span>
              </td>
              <td>{new Date(user.joinDate).toLocaleDateString()}</td>
              <td>
                <span className="status-badge success">Activo</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ReportsSection = ({ stats, orders }) => (
  <div className="reports-section">
    <div className="section-header">
      <h1>Reportes y Analytics</h1>
      <p>Métricas y estadísticas del sistema</p>
    </div>

    <div className="reports-grid">
      <div className="report-card">
        <h3>Ventas del Mes</h3>
        <div className="report-content">
          <div className="report-chart">
            <div className="chart-placeholder">📊</div>
          </div>
          <div className="report-stats">
            <div className="stat-item">
              <span className="stat-label">Ventas Totales</span>
              <span className="stat-value">${(stats.totalRevenue || 0).toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Órdenes</span>
              <span className="stat-value">{stats.totalOrders || 0}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Ticket Promedio</span>
              <span className="stat-value">
                ${stats.totalOrders ? Math.floor(stats.totalRevenue / stats.totalOrders) : 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="report-card">
        <h3>Productos Más Vendidos</h3>
        <div className="top-products">
          {['iPhone 15 Pro', 'MacBook Pro', 'AirPods Pro'].map((product, index) => (
            <div key={index} className="top-product">
              <div className="product-rank">{index + 1}</div>
              <div className="product-name">{product}</div>
              <div className="product-sales">+{Math.floor(Math.random() * 100)} ventas</div>
            </div>
          ))}
        </div>
      </div>

      <div className="report-card">
        <h3>Estado de Órdenes</h3>
        <div className="order-status-chart">
          <div className="status-item">
            <span className="status-label">Completadas</span>
            <div className="status-bar">
              <div 
                className="status-fill completed" 
                style={{ width: '70%' }}
              ></div>
            </div>
            <span className="status-percent">70%</span>
          </div>
          <div className="status-item">
            <span className="status-label">Pendientes</span>
            <div className="status-bar">
              <div 
                className="status-fill pending" 
                style={{ width: '20%' }}
              ></div>
            </div>
            <span className="status-percent">20%</span>
          </div>
          <div className="status-item">
            <span className="status-label">Canceladas</span>
            <div className="status-bar">
              <div 
                className="status-fill cancelled" 
                style={{ width: '10%' }}
              ></div>
            </div>
            <span className="status-percent">10%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProfileSection = ({ user }) => (
  <div className="profile-section">
    <div className="section-header">
      <h1>Perfil de Administrador</h1>
      <p>Gestiona tu información personal</p>
    </div>

    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.avatar}
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="profile-role">{user.role}</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-group">
          <label>Nombre Completo</label>
          <input type="text" value={user.name} readOnly />
        </div>
        <div className="detail-group">
          <label>Email</label>
          <input type="email" value={user.email} readOnly />
        </div>
        <div className="detail-group">
          <label>Rol</label>
          <input type="text" value={user.role} readOnly />
        </div>
        <div className="detail-group">
          <label>Fecha de Registro</label>
          <input type="text" value={new Date(user.joinDate).toLocaleDateString()} readOnly />
        </div>
      </div>

      <div className="profile-actions">
        <button className="btn btn-primary">Actualizar Perfil</button>
        <button className="btn btn-outline">Cambiar Contraseña</button>
      </div>
    </div>
  </div>
);

// Modales (mantener los mismos de antes)
const ProductModal = ({ show, onHide, onSave, product, categories }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    category: product?.category || '',
    image: product?.image || '',
    description: product?.description || '',
    stock: product?.stock || 0,
    features: product?.features ? product.features.join(', ') : '',
    isFeatured: product?.isFeatured || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      features: formData.features.split(',').map(f => f.trim())
    });
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{product ? 'Editar Producto' : 'Agregar Producto'}</h2>
          <button onClick={onHide} className="close-btn">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label>Nombre del Producto *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Categoría *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>URL de Imagen *</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Descripción *</label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Características (separadas por comas) *</label>
              <textarea
                rows={3}
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Ej: 16GB RAM, 1TB SSD, Pantalla Retina"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Producto destacado
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onHide} className="btn btn-outline">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {product ? 'Actualizar' : 'Crear'} Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CategoryModal = ({ show, onHide, onSave, category }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    icon: category?.icon || '',
    description: category?.description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{category ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
          <button onClick={onHide} className="close-btn">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Nombre de la Categoría *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="ej: smartphones"
              />
            </div>
            <div className="form-group">
              <label>Icono *</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                required
                placeholder="ej: 📱"
              />
            </div>
            <div className="form-group">
              <label>Descripción *</label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onHide} className="btn btn-outline">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {category ? 'Actualizar' : 'Crear'} Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;