import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CabCancelRequestTable from './CabCancelRequestTable';

describe('<CabCancelRequestTable />', () => {
  test('it should mount', () => {
    render(<CabCancelRequestTable />);
    
    const cabCancelRequestTable = screen.getByTestId('CabCancelRequestTable');

    expect(cabCancelRequestTable).toBeInTheDocument();
  });
});