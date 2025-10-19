import React from 'react';
import { render, screen } from '@testing-library/react';

// Componente de ejemplo para pruebas de renderizado condicional
const ErrorMessage = ({ error }) => {
  if (!error) return null;
  
  return (
    <div data-testid="error-message" className="error-message">
      {error}
    </div>
  );
};

const UserGreeting = ({ user }) => {
  return (
    <div>
      {user ? (
        <span data-testid="welcome-message">Bienvenido, {user.name}</span>
      ) : (
        <span data-testid="login-prompt">Por favor inicia sesión</span>
      )}
    </div>
  );
};

describe('Pruebas de Renderizado Condicional', () => {
  test('ErrorMessage solo se muestra cuando hay un error', () => {
    const { rerender } = render(<ErrorMessage error={null} />);
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();

    rerender(<ErrorMessage error="Error de validación" />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Error de validación')).toBeInTheDocument();
  });

  test('UserGreeting muestra mensaje correcto según el estado de autenticación', () => {
    const { rerender } = render(<UserGreeting user={null} />);
    expect(screen.getByTestId('login-prompt')).toBeInTheDocument();
    expect(screen.queryByTestId('welcome-message')).not.toBeInTheDocument();

    rerender(<UserGreeting user={{ name: 'Juan' }} />);
    expect(screen.getByTestId('welcome-message')).toBeInTheDocument();
    expect(screen.getByText('Bienvenido, Juan')).toBeInTheDocument();
    expect(screen.queryByTestId('login-prompt')).not.toBeInTheDocument();
  });
});