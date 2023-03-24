import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

describe('<Login />', () => {
  test('it should mount', () => {
    render(<Login />, {wrapper:BrowserRouter});
    
    const login = screen.getByTestId('Login');

    expect(login).toBeInTheDocument();
  });
});