import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CarRentalUserTable from './CarRentalUserTable';

describe('<CarRentalUserTable />', () => {
  test('it should mount', () => {
    render(<CarRentalUserTable />);
    
    const carRentalUserTable = screen.getByTestId('CarRentalUserTable');

    expect(carRentalUserTable).toBeInTheDocument();
  });
});