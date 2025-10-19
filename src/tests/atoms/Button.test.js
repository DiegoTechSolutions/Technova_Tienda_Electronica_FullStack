import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../../src/components/atoms/Button/Button';

describe('Button Component - Pruebas de Renderizado', () => {
  test('renderiza correctamente con texto proporcionado', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('renderiza con variante primary', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const buttonElement = screen.getByText(/primary button/i);
    expect(buttonElement).toHaveClass('btn-primary');
  });

  test('renderiza con variante outline', () => {
    render(<Button variant="outline">Outline Button</Button>);
    const buttonElement = screen.getByText(/outline button/i);
    expect(buttonElement).toHaveClass('btn-outline');
  });

  test('renderiza estado de loading correctamente', () => {
    render(<Button loading>Loading Button</Button>);
    const buttonElement = screen.getByText(/loading button/i);
    const spinner = screen.getByTestId('loading-spinner');
    
    expect(buttonElement).toBeDisabled();
    expect(spinner).toBeInTheDocument();
  });

  test('renderizado condicional - muestra spinner solo cuando loading es true', () => {
    const { rerender } = render(<Button loading>Button</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    rerender(<Button loading={false}>Button</Button>);
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});