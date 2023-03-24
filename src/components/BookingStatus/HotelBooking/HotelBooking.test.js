import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HotelBooking from './HotelBooking';
import { BrowserRouter } from 'react-router-dom';

describe('<HotelBooking />', () => {
  test('it should mount', () => {
    render(<HotelBooking />, {wrapper:BrowserRouter});
    
    const hotelBooking = screen.getByTestId('HotelBooking');

    expect(hotelBooking).toBeInTheDocument();
  });
});