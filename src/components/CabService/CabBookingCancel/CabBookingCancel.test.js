import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CabBookingCancel from './CabBookingCancel';

describe('<CabBookingCancel />', () => {
  test('it should mount', () => {
    render(<CabBookingCancel />);
    
    const cabBookingCancel = screen.getByTestId('CabBookingCancel');

    expect(cabBookingCancel).toBeInTheDocument();
  });
});