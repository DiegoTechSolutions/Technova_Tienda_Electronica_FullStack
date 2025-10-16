import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <Container className="order-success-page py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center success-card">
            <Card.Body className="py-5">
              <div className="success-icon mb-4" style={{fontSize: '4rem'}}>🎉</div>
              <h1 className="text-success mb-3">¡Compra Exitosa!</h1>
              <p className="lead mb-4">
                Tu orden ha sido procesada correctamente. Recibirás un correo de confirmación shortly.
              </p>
              
              <Card className="mb-4">
                <Card.Body>
                  <h5>Resumen de tu Orden</h5>
                  <p><strong>Número de Orden:</strong> TECH-{Date.now()}</p>
                  <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                  <p><strong>Total:</strong> $287,750</p>
                  <p><strong>Estado:</strong> <span className="text-success">Confirmada</span></p>
                </Card.Body>
              </Card>

              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button as={Link} to="/" variant="primary" size="lg">
                  Continuar Comprando
                </Button>
                <Button as={Link} to="/categories" variant="outline-primary" size="lg">
                  Ver Más Productos
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;