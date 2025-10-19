import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../../src/components/molecules/ProductCard/ProductCard';

// Mock para el hook de carrito
jest.mock('../../../src/contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
    cart: []
  })
}));

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 99990,
  description: 'Test description',
  image: '📱',
  badge: 'Nuevo',
  inStock: true
};

describe('ProductCard Component - Pruebas de Estado', () => {
  test('cambia el estado al hacer hover sobre la tarjeta', () => {
    render(<ProductCard product={mockProduct} />);
    const productCard = screen.getByTestId('product-card');
    
    fireEvent.mouseEnter(productCard);
    expect(productCard).toHaveStyle('transform: translateY(-4px)');
    
    fireEvent.mouseLeave(productCard);
    expect(productCard).toHaveStyle('transform: translateY(0)');
  });

  test('maneja correctamente el estado de stock', () => {
    const { rerender } = render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/agregar al carrito/i)).toBeEnabled();

    const outOfStockProduct = { ...mockProduct, inStock: false };
    rerender(<ProductCard product={outOfStockProduct} />);
    expect(screen.getByText(/agotado/i)).toBeInTheDocument();
  });
});