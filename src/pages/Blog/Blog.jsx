import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Los mejores smartphones de 2024',
      excerpt: 'Revisamos los últimos lanzamientos en el mundo de los smartphones y qué esperar para el resto del año.',
      date: '15 Marzo 2024',
      author: 'Diego Andrés',
      image: '/images/blog-smartphones.jpg',
      category: 'Tecnología'
    },
    {
      id: 2,
      title: 'Cómo elegir la laptop perfecta para tu trabajo',
      excerpt: 'Guía completa para seleccionar la laptop ideal según tus necesidades profesionales y de entretenimiento.',
      date: '10 Marzo 2024',
      author: 'María González',
      image: '/images/blog-laptops.jpg',
      category: 'Productividad'
    },
    {
      id: 3,
      title: 'Tendencias en gaming para 2024',
      excerpt: 'Descubre lo que viene en el mundo del gaming: nuevas consolas, periféricos y tecnologías emergentes.',
      date: '5 Marzo 2024',
      author: 'Carlos López',
      image: '/images/blog-gaming.jpg',
      category: 'Gaming'
    },
    {
      id: 4,
      title: 'Audio profesional: ¿Qué audífonos necesitas?',
      excerpt: 'Comparativa de los mejores audífonos del mercado para diferentes usos y presupuestos.',
      date: '1 Marzo 2024',
      author: 'Ana Martínez',
      image: '/images/blog-audio.jpg',
      category: 'Audio'
    }
  ];

  return (
    <Container className="blog-page py-5">
      <Row>
        <Col>
          <h1 className="page-title text-center mb-5">Blog Technova</h1>
          <p className="lead text-center mb-5">
            Mantente actualizado con las últimas tendencias en tecnología
          </p>
        </Col>
      </Row>
      
      <Row>
        {blogPosts.map(post => (
          <Col key={post.id} lg={6} className="mb-4">
            <Card className="blog-card h-100">
              <div className="blog-image" style={{
                height: '200px',
                background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                {post.title}
              </div>
              <Card.Body>
                <div className="blog-meta mb-2">
                  <span className="badge bg-primary me-2">{post.category}</span>
                  <small className="text-muted">{post.date} • Por {post.author}</small>
                </div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.excerpt}</Card.Text>
                <button className="btn btn-outline-primary btn-sm">
                  Leer más
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;