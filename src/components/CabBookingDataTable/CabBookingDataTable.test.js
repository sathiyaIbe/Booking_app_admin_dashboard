import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CabBookingDataTable from './CabBookingDataTable';

describe('<CabBookingDataTable />', () => {
  test('it should mount', () => {
    render(<CabBookingDataTable />);
    
    const cabBookingDataTable = screen.getByTestId('CabBookingDataTable');

    expect(cabBookingDataTable).toBeInTheDocument();
  });
});