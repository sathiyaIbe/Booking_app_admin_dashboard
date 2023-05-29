import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CarRental from './CarRental';

describe('<CarRental />', () => {
  test('it should mount', () => {
    render(<CarRental />);
    
    const carRental = screen.getByTestId('CarRental');

    expect(carRental).toBeInTheDocument();
  });
});