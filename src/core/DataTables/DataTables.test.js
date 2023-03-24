import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataTables from './DataTables';

describe('<DataTables />', () => {
  test('it should mount', () => {
    render(<DataTables />);
    
    const dataTables = screen.getByTestId('DataTables');

    expect(dataTables).toBeInTheDocument();
  });
});