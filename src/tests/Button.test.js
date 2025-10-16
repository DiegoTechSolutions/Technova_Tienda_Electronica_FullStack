// src/tests/Button.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/atoms/Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText(/Click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});