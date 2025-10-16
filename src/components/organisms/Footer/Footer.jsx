import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Technova",
      content: "Tu tienda de confianza para tecnología de vanguardia. Productos premium con garantía oficial y soporte especializado.",
      links: [
        { name: "Sobre Nosotros", url: "/about" },
        { name: "Nuestro Equipo", url: "/team" },
        { name: "Trabaja con Nosotros", url: "/careers" },
        { name: "Sala de Prensa", url: "/press" }
      ]
    },
    {
      title: "Comprar",
      links: [
        { name: "Todos los Productos", url: "/categories" },
        { name: "Ofertas Especiales", url: "/offers" },
        { name: "Productos Destacados", url: "/featured" },
        { name: "Nuevos Lanzamientos", url: "/new" },
        { name: "Más Vendidos", url: "/bestsellers" }
      ]
    },
    {
      title: "Soporte",
      links: [
        { name: "Centro de Ayuda", url: "/help" },
        { name: "Contacto", url: "/contact" },
        { name: "Soporte Técnico", url: "/support" },
        { name: "Estado de Pedidos", url: "/orders" },
        { name: "Reparaciones", url: "/repairs" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Términos y Condiciones", url: "/terms" },
        { name: "Política de Privacidad", url: "/privacy" },
        { name: "Política de Envíos", url: "/shipping" },
        { name: "Garantías y Devoluciones", url: "/warranty" }
      ]
    }
  ];

  const contactInfo = [
    { icon: "✉️", text: "info@technova.com", type: "email" },
    { icon: "📞", text: "+56 9 1234 5678", type: "phone" },
    { icon: "📍", text: "Egaña, Puerto Montt", type: "address" },
    { icon: "🕒", text: "Lun - Vie: 9:00 - 18:00", type: "hours" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "#" },
    { name: "Instagram", icon: "📷", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "LinkedIn", icon: "💼", url: "#" }
  ];

  const paymentMethods = [
    "Visa", "Mastercard", "American Express", "Webpay"
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <div className="footer-sections">
            {footerSections.map((section, index) => (
              <div key={index} className="footer-section">
                <h3 className="footer-title">{section.title}</h3>
                {section.content && (
                  <p className="footer-description">{section.content}</p>
                )}
                <ul className="footer-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.url} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Newsletter */}
          <div className="footer-extra">
            <div className="contact-info">
              <h3 className="footer-title">Contacto</h3>
              <div className="contact-details">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="contact-item">
                    <span className="contact-icon">{contact.icon}</span>
                    <span className="contact-text">{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="newsletter">
              <h3 className="footer-title">Newsletter</h3>
              <p className="newsletter-description">
                Suscríbete para recibir ofertas exclusivas y novedades.
              </p>
              <form className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Tu correo electrónico"
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-button">
                    Suscribir
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Technova. Todos los derechos reservados.</p>
            </div>
            
            <div className="footer-meta">
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-link"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <div className="payment-methods">
                <span className="payment-label">Métodos de pago:</span>
                <div className="payment-icons">
                  {paymentMethods.map((method, index) => (
                    <span key={index} className="payment-icon">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;