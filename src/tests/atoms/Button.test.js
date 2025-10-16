import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/atoms/Button/Button';

describe('Button Component', () => {
  test('1. Renderiza correctamente con children', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('2. Aplica variante primary correctamente', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const buttonElement = screen.getByText(/Primary Button/i);
    expect(buttonElement).toHaveClass('btn-primary');
  });

  test('3. Ejecuta onClick cuando se hace clic', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('4. Se deshabilita correctamente', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText(/Disabled Button/i);
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('disabled');
  });

  test('5. Aplica tamaño large correctamente', () => {
    render(<Button size="large">Large Button</Button>);
    const buttonElement = screen.getByText(/Large Button/i);
    expect(buttonElement).toHaveClass('btn-large');
  });
});