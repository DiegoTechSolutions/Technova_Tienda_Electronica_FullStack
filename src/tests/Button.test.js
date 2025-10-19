import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 99990,
  description: 'Test description',
  image: '📱',
  badge: 'Nuevo'
};

describe('ProductCard Component', () => {
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.990')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('Nuevo')).toBeInTheDocument();
  });

  test('calls onAddToCart when add to cart button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    
    const addToCartButton = screen.getByText(/agregar al carrito/i);
    fireEvent.click(addToCartButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('calls onViewDetails when view details button is clicked', () => {
    const mockViewDetails = jest.fn();
    render(<ProductCard product={mockProduct} onViewDetails={mockViewDetails} />);
    
    const viewDetailsButton = screen.getByText(/ver detalles/i);
    fireEvent.click(viewDetailsButton);
    
    expect(mockViewDetails).toHaveBeenCalledWith(mockProduct);
  });

  test('displays correct badge variant', () => {
    render(<ProductCard product={mockProduct} />);
    const badge = screen.getByText('Nuevo');
    
    expect(badge).toHaveClass('badge-success');
  });
});