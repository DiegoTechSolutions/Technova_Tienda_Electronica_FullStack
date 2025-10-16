import React from 'react';
import Button from '../../atoms/Button/Button';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  const { id, name, price, image, category, inStock } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
        {!inStock && <div className="out-of-stock">Agotado</div>}
      </div>
      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{name}</h3>
        <div className="product-price">${price.toLocaleString()}</div>
        <div className="product-actions">
          <Button 
            variant="primary" 
            onClick={() => onAddToCart(product)}
            disabled={!inStock}
          >
            Agregar al Carrito
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => onViewDetails(product)}
          >
            Ver Detalles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;