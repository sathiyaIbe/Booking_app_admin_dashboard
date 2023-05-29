import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CarBookingTable from './CarBookingTable';

describe('<CarBookingTable />', () => {
  test('it should mount', () => {
    render(<CarBookingTable />);
    
    const carBookingTable = screen.getByTestId('CarBookingTable');

    expect(carBookingTable).toBeInTheDocument();
  });
});