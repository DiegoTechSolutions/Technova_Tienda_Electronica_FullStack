import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../../src/components/molecules/ProductCard/ProductCard';

// Mock para el hook de carrito
const mockAddToCart = jest.fn();
jest.mock('../../../src/contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
    cart: []
  })
}));

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 99990,
  description: 'Test description',
  image: '📱',
  badge: 'Nuevo'
};

describe('ProductCard Component - Pruebas de Eventos', () => {
  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  test('ejecuta onAddToCart al hacer clic en el botón Agregar al Carrito', () => {
    render(<ProductCard product={mockProduct} />);
    
    const addToCartButton = screen.getByText(/agregar al carrito/i);
    fireEvent.click(addToCartButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
  });

  test('ejecuta onViewDetails al hacer clic en el botón Ver Detalles', () => {
    const mockViewDetails = jest.fn();
    render(<ProductCard product={mockProduct} onViewDetails={mockViewDetails} />);
    
    const viewDetailsButton = screen.getByText(/ver detalles/i);
    fireEvent.click(viewDetailsButton);
    
    expect(mockViewDetails).toHaveBeenCalledWith(mockProduct);
    expect(mockViewDetails).toHaveBeenCalledTimes(1);
  });

  test('no ejecuta onAddToCart cuando el producto está agotado', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(<ProductCard product={outOfStockProduct} />);
    
    const addToCartButton = screen.getByText(/agotado/i);
    fireEvent.click(addToCartButton);
    
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});