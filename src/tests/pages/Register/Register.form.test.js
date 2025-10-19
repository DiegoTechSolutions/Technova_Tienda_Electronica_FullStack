import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../../../src/pages/Register/Register';

// Mock para navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Register Page - Pruebas de Formularios', () => {
  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  test('cambia el estado del formulario cuando el usuario introduce texto', () => {
    renderWithRouter(<Register onLogin={jest.fn()} />);
    
    const nameInput = screen.getByLabelText(/nombre completo/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    
    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@example.com' } });
    
    expect(nameInput.value).toBe('Juan Pérez');
    expect(emailInput.value).toBe('juan@example.com');
  });

  test('muestra mensajes de error cuando el formulario es inválido', async () => {
    renderWithRouter(<Register onLogin={jest.fn()} />);
    
    const submitButton = screen.getByText(/crear cuenta/i);
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/el nombre es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/el email es requerido/i)).toBeInTheDocument();
      expect(screen.getByText(/la contraseña es requerida/i)).toBeInTheDocument();
    });
  });

  test('valida formato de email correctamente', async () => {
    renderWithRouter(<Register onLogin={jest.fn()} />);
    
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const submitButton = screen.getByText(/crear cuenta/i);
    
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/el email no es válido/i)).toBeInTheDocument();
    });
  });

  test('valida que las contraseñas coincidan', async () => {
    renderWithRouter(<Register onLogin={jest.fn()} />);
    
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    const submitButton = screen.getByText(/crear cuenta/i);
    
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Different123' } });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    });
  });
});