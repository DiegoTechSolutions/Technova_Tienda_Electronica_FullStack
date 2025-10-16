import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="about-page py-5">
      <Row>
        <Col>
          <h1 className="page-title text-center mb-5">Nosotros</h1>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col lg={6}>
          <h2>Nuestra Historia</h2>
          <p className="lead">
            Technova nació en 2024 con la misión de revolucionar la experiencia de compra de tecnología en Chile.
          </p>
          <p>
            Somos un equipo de apasionados por la tecnología que busca brindar los últimos avances 
            tecnológicos a precios accesibles, con un servicio excepcional y entrega inmediata.
          </p>
          <p>
            Creemos que la tecnología debe estar al alcance de todos y nos esforzamos cada día 
            para hacer de Technova tu tienda de confianza.
          </p>
        </Col>
        <Col lg={6}>
          <div style={{
            height: '300px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            Technova - Innovación Tecnológica
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Nuestros Valores</h2>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="value-icon mb-3" style={{fontSize: '3rem'}}>🚀</div>
              <Card.Title>Innovación</Card.Title>
              <Card.Text>
                Siempre a la vanguardia con los últimos lanzamientos y tendencias tecnológicas.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="value-icon mb-3" style={{fontSize: '3rem'}}>🤝</div>
              <Card.Title>Confianza</Card.Title>
              <Card.Text>
                Productos 100% originales con garantía oficial y soporte técnico especializado.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center h-100">
            <Card.Body>
              <div className="value-icon mb-3" style={{fontSize: '3rem'}}>⚡</div>
              <Card.Title>Velocidad</Card.Title>
              <Card.Text>
                Entrega express en todo Chile y retiro inmediato en tiendas autorizadas.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h2 className="text-center mb-4">Nuestro Equipo</h2>
        </Col>
      </Row>
      <Row>
        <Col lg={3} md={6} className="mb-4">
          <Card className="text-center team-card">
            <Card.Body>
              <div className="team-avatar mb-3" style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem'
              }}>
                DA
              </div>
              <Card.Title>Diego Andrés</Card.Title>
              <Card.Text>CEO & Fundador</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="text-center team-card">
            <Card.Body>
              <div className="team-avatar mb-3" style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem'
              }}>
                MG
              </div>
              <Card.Title>María González</Card.Title>
              <Card.Text>Directora de Tecnología</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="text-center team-card">
            <Card.Body>
              <div className="team-avatar mb-3" style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem'
              }}>
                CL
              </div>
              <Card.Title>Carlos López</Card.Title>
              <Card.Text>Jefe de Ventas</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-4">
          <Card className="text-center team-card">
            <Card.Body>
              <div className="team-avatar mb-3" style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2rem'
              }}>
                AM
              </div>
              <Card.Title>Ana Martínez</Card.Title>
              <Card.Text>Gerente de Marketing</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;