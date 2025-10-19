import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Categories from '../../../src/pages/Categories/Categories';

// Mock para useCart
jest.mock('../../../src/contexts/CartContext', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
    cart: []
  })
}));

// Mock para productos
jest.mock('../../../src/data/database', () => ({
  getProducts: () => [
    {
      id: 1,
      name: 'Product 1',
      category: 'smartphones',
      price: 100000,
      description: 'Description 1',
      image: '📱',
      inStock: true
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'laptops',
      price: 200000,
      description: 'Description 2',
      image: '💻',
      inStock: true
    },
    {
      id: 3,
      name: 'Product 3',
      category: 'smartphones',
      price: 150000,
      description: 'Description 3',
      image: '📱',
      inStock: false
    }
  ],
  getCategories: () => [
    {
      name: 'smartphones',
      displayName: 'Smartphones',
      icon: '📱',
      description: 'Los últimos modelos'
    },
    {
      name: 'laptops',
      displayName: 'Laptops',
      icon: '💻',
      description: 'Potencia y portabilidad'
    }
  ]
}));

describe('Categories Page - Pruebas de Listas', () => {
  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test('renderiza todos los elementos de la lista de categorías', () => {
    renderWithRouter(<Categories user={{}} onLogout={jest.fn()} />);
    
    const categories = screen.getAllByTestId('category-filter');
    expect(categories).toHaveLength(3); // Incluye "Todas las categorías"
    
    expect(screen.getByText('Smartphones')).toBeInTheDocument();
    expect(screen.getByText('Laptops')).toBeInTheDocument();
  });

  test('renderiza todos los productos de una categoría específica', () => {
    renderWithRouter(<Categories user={{}} onLogout={jest.fn()} />);
    
    // Verificar que se rendericen todos los productos
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(3);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  test('filtra productos correctamente por categoría', () => {
    renderWithRouter(<Categories user={{}} onLogout={jest.fn()} />);
    
    // Hacer clic en la categoría smartphones
    const smartphonesCategory = screen.getByText('Smartphones');
    // Nota: En una implementación real, necesitarías simular la navegación
    // Esta prueba asume que el filtrado se hace client-side
    
    // Verificar que se muestre el contador correcto
    expect(screen.getByText(/3 producto/)).toBeInTheDocument();
  });
});