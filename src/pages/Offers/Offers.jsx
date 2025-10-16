import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';
import { getProducts } from '../../data/database';
import './Offers.css';

const Offers = ({ onAddToCart, onViewDetails }) => {
  // Simulamos productos en oferta (en una app real, tendrían un campo de descuento)
  const products = getProducts().map(product => ({
    ...product,
    // Añadimos un descuento aleatorio para simular
    discount: Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 10 : 0
  })).filter(product => product.discount > 0);

  return (
    <Container className="offers-page py-5">
      <Row>
        <Col>
          <h1 className="page-title text-center mb-5">Ofertas Especiales</h1>
          <p className="lead text-center mb-5">
            Aprovecha nuestros descuentos exclusivos por tiempo limitado
          </p>
        </Col>
      </Row>
      <Row>
        {products.length > 0 ? (
          products.map(product => (
            <Col key={product.id} lg={3} md={6} className="mb-4">
              <div className="offer-card">
                <Badge bg="danger" className="discount-badge">
                  -{product.discount}%
                </Badge>
                <ProductCard 
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                />
              </div>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <h3>No hay ofertas disponibles en este momento</h3>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Offers;