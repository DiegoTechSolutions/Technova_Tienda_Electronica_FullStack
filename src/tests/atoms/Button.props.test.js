import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../src/components/atoms/Button/Button';

describe('Button Component - Pruebas de Propiedades', () => {
  test('recibe y utiliza correctamente la propiedad onClick', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('recibe y utiliza correctamente la propiedad disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText(/disabled button/i);
    
    expect(buttonElement).toBeDisabled();
  });

  test('recibe y utiliza correctamente la propiedad variant', () => {
    const { rerender } = render(<Button variant="primary">Button</Button>);
    expect(screen.getByText(/button/i)).toHaveClass('btn-primary');

    rerender(<Button variant="outline">Button</Button>);
    expect(screen.getByText(/button/i)).toHaveClass('btn-outline');
  });

  test('recibe y utiliza correctamente la propiedad size', () => {
    render(<Button size="sm">Small Button</Button>);
    const buttonElement = screen.getByText(/small button/i);
    
    expect(buttonElement).toHaveClass('btn-sm');
  });
});