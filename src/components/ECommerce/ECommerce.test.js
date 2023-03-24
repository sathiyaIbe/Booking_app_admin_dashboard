import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ECommerce from './ECommerce';

describe('<ECommerce />', () => {
  test('it should mount', () => {
    render(<ECommerce />);
    
    const eCommerce = screen.getByTestId('ECommerce');

    expect(eCommerce).toBeInTheDocument();
  });
});