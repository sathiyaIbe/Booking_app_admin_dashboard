import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CabAuthentication from './CabAuthentication';

describe('<CabAuthentication />', () => {
  test('it should mount', () => {
    render(<CabAuthentication />);
    
    const cabAuthentication = screen.getByTestId('CabAuthentication');

    expect(cabAuthentication).toBeInTheDocument();
  });
});