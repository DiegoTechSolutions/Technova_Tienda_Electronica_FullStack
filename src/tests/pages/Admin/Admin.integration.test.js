import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Admin from '../../../src/pages/Admin/Admin';

// Mock para database
const mockProducts = [
  {
    id: 1,
    name: 'Test Product',
    price: 100000,
    category: 'smartphones',
    stock: 10,
    inStock: true,
    image: '📱',
    description: 'Test description'
  }
];

const mockCategories = [
  {
    id: 1,
    name: 'Smartphones',
    slug: 'smartphones',
    icon: '📱',
    description: 'Los últimos modelos'
  }
];

const mockOrders = [
  {
    id: 1,
    orderNumber: 'TECH-001',
    customer: {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@example.com'
    },
    total: 100000,
    orderDate: '2024-03-15T10:30:00Z',
    status: 'pending'
  }
];

const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@technova.com',
    role: 'admin',
    avatar: 'AU',
    joinDate: '2024-01-01'
  }
];

jest.mock('../../../src/data/database', () => ({
  getProducts: () => mockProducts,
  getCategories: () => mockCategories,
  getOrders: () => mockOrders,
  getUsers: () => mockUsers,
  getAdminStats: () => ({
    totalProducts: 1,
    totalOrders: 1,
    totalUsers: 1,
    totalRevenue: 100000,
    pendingOrders: 1,
    completedOrders: 0
  }),
  updateOrderStatus: jest.fn(),
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  addCategory: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn()
}));

describe('Admin Panel - Pruebas de Integración', () => {
  const mockUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@technova.com',
    role: 'admin',
    avatar: 'AU',
    joinDate: '2024-01-01'
  };

  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  test('navega correctamente entre las secciones del admin', () => {
    renderWithRouter(<Admin user={mockUser} onLogout={jest.fn()} />);
    
    // Verificar que el dashboard se muestra inicialmente
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    
    // Navegar a productos
    fireEvent.click(screen.getByText('🛍️ Productos'));
    expect(screen.getByText('Gestión de Productos')).toBeInTheDocument();
    
    // Navegar a órdenes
    fireEvent.click(screen.getByText('📦 Órdenes'));
    expect(screen.getByText('Gestión de Órdenes')).toBeInTheDocument();
    
    // Navegar a categorías
    fireEvent.click(screen.getByText('📑 Categorías'));
    expect(screen.getByText('Gestión de Categorías')).toBeInTheDocument();
  });

  test('muestra y oculta modales correctamente', async () => {
    renderWithRouter(<Admin user={mockUser} onLogout={jest.fn()} />);
    
    // Ir a la sección de productos
    fireEvent.click(screen.getByText('🛍️ Productos'));
    
    // Abrir modal de agregar producto
    fireEvent.click(screen.getByText('+ Agregar Producto'));
    
    await waitFor(() => {
      expect(screen.getByText('Agregar Producto')).toBeInTheDocument();
    });
    
    // Cerrar modal
    fireEvent.click(screen.getByText('×'));
    
    await waitFor(() => {
      expect(screen.queryByText('Agregar Producto')).not.toBeInTheDocument();
    });
  });

  test('actualiza el estado de una orden correctamente', () => {
    renderWithRouter(<Admin user={mockUser} onLogout={jest.fn()} />);
    
    // Ir a la sección de órdenes
    fireEvent.click(screen.getByText('📦 Órdenes'));
    
    // Encontrar el select de estado y cambiar su valor
    const statusSelect = screen.getByDisplayValue('pending');
    fireEvent.change(statusSelect, { target: { value: 'completed' } });
    
    // Verificar que la función de actualización fue llamada
    const { updateOrderStatus } = require('../../../src/data/database');
    expect(updateOrderStatus).toHaveBeenCalledWith(1, 'completed');
  });
});