import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CabUserTable from './CabUserTable';

describe('<CabUserTable />', () => {
  test('it should mount', () => {
    render(<CabUserTable />);
    
    const cabUserTable = screen.getByTestId('CabUserTable');

    expect(cabUserTable).toBeInTheDocument();
  });
});