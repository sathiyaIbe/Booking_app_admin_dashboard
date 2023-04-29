import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CabAuthenticationTable from './CabAuthenticationTable';

describe('<CabAuthenticationTable />', () => {
  test('it should mount', () => {
    render(<CabAuthenticationTable />);
    
    const cabAuthenticationTable = screen.getByTestId('CabAuthenticationTable');

    expect(cabAuthenticationTable).toBeInTheDocument();
  });
});