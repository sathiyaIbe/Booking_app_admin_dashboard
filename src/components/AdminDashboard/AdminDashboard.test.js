import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

describe('<AdminDashboard />', () => {
  test('it should mount', () => {
    render(<AdminDashboard />, {wrapper:BrowserRouter});
    
    const adminDashboard = screen.getByTestId('AdminDashboard');

    expect(adminDashboard).toBeInTheDocument();
  });
});