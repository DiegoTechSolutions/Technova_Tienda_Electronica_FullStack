import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/molecules/ProductCard/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 99990,
  image: '/test-image.jpg',
  category: 'smartphones',
  inStock: true
};

describe('ProductCard Component', () => {
  test('6. Renderiza información del producto correctamente', () => {
    render(
      <ProductCard 
        product={mockProduct}
        onAddToCart={jest.fn()}
        onViewDetails={jest.fn()}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.990')).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
  });

  test('7. Ejecuta onAddToCart al hacer clic en agregar al carrito', () => {
    const mockAddToCart = jest.fn();
    render(
      <ProductCard 
        product={mockProduct}
        onAddToCart={mockAddToCart}
        onViewDetails={jest.fn()}
      />
    );

    const addButton = screen.getByText('Agregar al Carrito');
    fireEvent.click(addButton);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  test('8. Muestra etiqueta "Agotado" cuando no hay stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(
      <ProductCard 
        product={outOfStockProduct}
        onAddToCart={jest.fn()}
        onViewDetails={jest.fn()}
      />
    );

    expect(screen.getByText('Agotado')).toBeInTheDocument();
  });

  test('9. Deshabilita botón agregar cuando no hay stock', () => {
    const outOfStockProduct = { ...mockProduct, inStock: false };
    render(
      <ProductCard 
        product={outOfStockProduct}
        onAddToCart={jest.fn()}
        onViewDetails={jest.fn()}
      />
    );

    const addButton = screen.getByText('Agregar al Carrito');
    expect(addButton).toBeDisabled();
  });

  test('10. Ejecuta onViewDetails al hacer clic en ver detalles', () => {
    const mockViewDetails = jest.fn();
    render(
      <ProductCard 
        product={mockProduct}
        onAddToCart={jest.fn()}
        onViewDetails={mockViewDetails}
      />
    );

    const detailsButton = screen.getByText('Ver Detalles');
    fireEvent.click(detailsButton);
    expect(mockViewDetails).toHaveBeenCalledWith(mockProduct);
  });
});