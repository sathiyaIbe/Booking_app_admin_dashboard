import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CabBookingTable from './CabBookingTable';
import { BrowserRouter } from 'react-router-dom';

describe('<CabBookingTable />', () => {
  test('it should mount', () => {
    render(<CabBookingTable />, {wrapper:BrowserRouter});
    
    const cabBookingTable = screen.getByTestId('CabBookingTable');

    expect(cabBookingTable).toBeInTheDocument();
  });
});