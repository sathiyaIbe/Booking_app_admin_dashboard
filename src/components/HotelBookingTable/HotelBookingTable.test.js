import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HotelBookingTable from './HotelBookingTable';

describe('<HotelBookingTable />', () => {
  test('it should mount', () => {
    render(<HotelBookingTable />);
    
    const hotelBookingTable = screen.getByTestId('HotelBookingTable');

    expect(hotelBookingTable).toBeInTheDocument();
  });
});