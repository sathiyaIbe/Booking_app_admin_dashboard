import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CabService from './CabService';
import { BrowserRouter } from 'react-router-dom';

describe('<CabService />', () => {
  test('it should mount', () => {
    render(<CabService />, {wrapper:BrowserRouter});
    
    const cabService = screen.getByTestId('CabService');

    expect(cabService).toBeInTheDocument();
  });
});