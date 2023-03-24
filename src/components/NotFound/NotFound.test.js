import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  test('it should mount', () => {
    render(<NotFound />, {wrapper: BrowserRouter});
    
    const notFound = screen.getByTestId('NotFound');

    expect(notFound).toBeInTheDocument();
  });
}); 