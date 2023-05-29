import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../core/header/header';
import Context from '../../../services/Context/Context';
import './CarRental.css';
import { ApiCapGet } from '../../../services/apiCapRegister/apiCapRegister';
import CabUserTable from '../../CabUserTable/CabUserTable';
import CarRentalUserTable from "../../CarRentalUserTable/CarRentalUserTable";
const CarRental = () => {
  return (
    <Context.Consumer>
      {value => {
        const { sidebar, isDark } = value
       
        return (
          <div className="Cabs" data-testid="CarRental">
          <div className='header-cabs-container'>
              <Header />
            </div>
            <div className={`header-body-cabs-container ${sidebar ? 'navbar-cabs-user' : ''}`} >
              <h1 className='cabs-user-heading'>Car Rental Users </h1>
              <div className={`table-cabs-user ${sidebar ? 'sidebar-cabs-user' : ''}`}>
                <CarRentalUserTable val={true} />
              </div>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}

CarRental.propTypes = {};

CarRental.defaultProps = {};

export default CarRental;
