import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Tab, Tabs, Badge } from 'react-bootstrap';
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getCategories,
  getOrders,
  getUsers,
  getAdminStats,
  updateOrderStatus
} from '../../data/database';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

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

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(productId);
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

  return (
    <Container className="admin-page py-4">
      <Row>
        <Col>
          <h1 className="page-title">Panel de Administración</h1>
          <p className="text-muted">Gestiona tu tienda Technova</p>
        </Col>
      </Row>

      {/* Dashboard Stats */}
      {activeTab === 'dashboard' && (
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title">Productos</h6>
                    <h3>{stats.totalProducts}</h3>
                  </div>
                  <div className="stat-icon">📦</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title">Órdenes</h6>
                    <h3>{stats.totalOrders}</h3>
                  </div>
                  <div className="stat-icon">🛒</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title">Usuarios</h6>
                    <h3>{stats.totalUsers}</h3>
                  </div>
                  <div className="stat-icon">👥</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="stat-card">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title">Ingresos</h6>
                    <h3>${stats.totalRevenue?.toLocaleString()}</h3>
                  </div>
                  <div className="stat-icon">💰</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
        {/* Dashboard Tab */}
        <Tab eventKey="dashboard" title="Dashboard">
          <Row>
            <Col lg={8}>
              <Card>
                <Card.Header>
                  <h5>Órdenes Recientes</h5>
                </Card.Header>
                <Card.Body>
                  {orders.length > 0 ? (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Cliente</th>
                          <th>Total</th>
                          <th>Fecha</th>
                          <th>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map(order => (
                          <tr key={order.id}>
                            <td>{order.orderNumber}</td>
                            <td>{order.customer?.nombre} {order.customer?.apellido}</td>
                            <td>${order.total?.toLocaleString()}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>
                              <Badge bg={getStatusVariant(order.status)}>
                                {order.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No hay órdenes registradas</p>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Card>
                <Card.Header>
                  <h5>Productos Populares</h5>
                </Card.Header>
                <Card.Body>
                  {products.filter(p => p.isFeatured).slice(0, 5).map(product => (
                    <div key={product.id} className="d-flex align-items-center mb-3">
                      <div className="product-thumb me-3" style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <div className="fw-bold">{product.name}</div>
                        <div className="text-muted">${product.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* Products Tab */}
        <Tab eventKey="products" title="Productos">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Gestión de Productos</h5>
            <Button onClick={() => setShowProductModal(true)}>
              + Agregar Producto
            </Button>
          </div>
          <Table responsive striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagen</th>
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
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '4px'
                    }}></div>
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price.toLocaleString()}</td>
                  <td>
                    <Badge bg="secondary">{product.category}</Badge>
                  </td>
                  <td>{product.stock}</td>
                  <td>
                    <Badge bg={product.inStock ? 'success' : 'danger'}>
                      {product.inStock ? 'En Stock' : 'Agotado'}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditProduct(product)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Orders Tab */}
        <Tab eventKey="orders" title="Órdenes">
          <h5 className="mb-3">Gestión de Órdenes</h5>
          <Table responsive striped>
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
                    <Badge bg={getStatusVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    <Form.Select
                      size="sm"
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      style={{ width: 'auto' }}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        {/* Users Tab */}
        <Tab eventKey="users" title="Usuarios">
          <h5 className="mb-3">Gestión de Usuarios</h5>
          <Table responsive striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Registro</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

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
    </Container>
  );
};

// Componente Modal para Producto
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

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Producto *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría *</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock *</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>URL de Imagen *</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Características (separadas por comas) *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="features"
              value={formData.features}
              onChange={handleChange}
              placeholder="Ej: 16GB RAM, 1TB SSD, Pantalla Retina"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isFeatured"
              label="Producto destacado"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {product ? 'Actualizar' : 'Crear'} Producto
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default Admin;