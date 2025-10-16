import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Form, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, getProductById } from '../../data/database';
import './Cart.css';

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState(getCart());
  const navigate = useNavigate();

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = updateCartItem(itemId, newQuantity);
    setCartItems([...updatedCart]);
  };

  const removeItem = (itemId) => {
    const updatedCart = removeFromCart(itemId);
    setCartItems([...updatedCart]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="cart-page">
        <Row>
          <Col>
            <div className="empty-cart text-center py-5">
              <h2>Tu carrito está vacío</h2>
              <p>Agrega algunos productos increíbles</p>
              <Link to="/categories" className="btn btn-primary btn-lg">
                Continuar Comprando
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="cart-page">
      <Row>
        <Col>
          <h1 className="page-title">Carrito de Compras</h1>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <div className="cart-items">
            <Table responsive className="cart-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => {
                  const product = getProductById(item.productId);
                  if (!product) return null;

                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="product-info">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="product-image"
                          />
                          <div className="product-details">
                            <h5>{product.name}</h5>
                            <span className="category">{product.category}</span>
                          </div>
                        </div>
                      </td>
                      <td>${product.price.toLocaleString()}</td>
                      <td>
                        <div className="quantity-controls">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="quantity">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td>${(product.price * item.quantity).toLocaleString()}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>

        <Col lg={4}>
          <Card className="cart-summary">
            <Card.Header>
              <h5>Resumen del Pedido</h5>
            </Card.Header>
            <Card.Body>
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>${getCartTotal().toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>Envío:</span>
                <span>$0</span>
              </div>
              <div className="summary-item total">
                <strong>Total:</strong>
                <strong>${getCartTotal().toLocaleString()}</strong>
              </div>

              {!user && (
                <Alert variant="info" className="mt-3">
                  <small>
                    <Link to="/login">Inicia sesión</Link> para guardar tu información
                  </small>
                </Alert>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-100 mt-3"
                onClick={proceedToCheckout}
              >
                Proceder al Pago
              </Button>

              <Link to="/categories" className="btn btn-outline-secondary w-100 mt-2">
                Continuar Comprando
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;