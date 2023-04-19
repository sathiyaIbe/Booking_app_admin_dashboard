import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AllBooking from './AllBooking';

describe('<AllBooking />', () => {
  test('it should mount', () => {
    render(<AllBooking />);
    
    const allBooking = screen.getByTestId('AllBooking');

    expect(allBooking).toBeInTheDocument();
  });
});