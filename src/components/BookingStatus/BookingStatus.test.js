import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookingStatus from './BookingStatus';
import { BrowserRouter } from 'react-router-dom';

describe('<BookingStatus />', () => {
  test('it should mount', () => {
    render(<BookingStatus />, {wrapper:BrowserRouter});
    
    const bookingStatus = screen.getByTestId('BookingStatus');

    expect(bookingStatus).toBeInTheDocument();
  });
});