import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    alert('Mensaje enviado. Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Container className="contact-page py-5">
      <Row>
        <Col>
          <h1 className="page-title text-center mb-5">Contacto</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre *</Form.Label>
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
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Asunto *</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mensaje *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Enviar Mensaje
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Información de contacto */}
      <Row className="mt-5">
        <Col md={4} className="text-center mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="contact-icon mb-3">📍</div>
              <Card.Title>Dirección</Card.Title>
              <Card.Text>
                Av. Principal 123<br />
                Santiago, Chile
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="text-center mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="contact-icon mb-3">📞</div>
              <Card.Title>Teléfono</Card.Title>
              <Card.Text>
                +56 9 1234 5678<br />
                Lunes a Viernes 9:00 - 18:00
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="text-center mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="contact-icon mb-3">✉️</div>
              <Card.Title>Email</Card.Title>
              <Card.Text>
                info@technova.com<br />
                soporte@technova.com
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;