import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HotelUserTable from './HotelUserTable';

describe('<HotelUserTable />', () => {
  test('it should mount', () => {
    render(<HotelUserTable />);
    
    const hotelUserTable = screen.getByTestId('HotelUserTable');

    expect(hotelUserTable).toBeInTheDocument();
  });
});