


import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../../core/header/header';
import Context from '../../../services/Context/Context';

import { ApiCapGet } from '../../../services/apiCapRegister/apiCapRegister';
import CabUserTable from '../../CabUserTable/CabUserTable';
import './CabAuthentication.css';
import CabAuthenticationTable from '../../CabAuthenticationTable/CabAuthenticationTable';
const CabAuthentication = () => {
  return (
    <Context.Consumer>
      {value => {
        const { sidebar, isDark } = value
       
        return (
          <div className="Cabs" data-testid="CabAuthentication">
          <div className='header-cabs-container'>
              <Header />
            </div>
            <div className={`header-body-cabs-container ${sidebar ? 'navbar-cabs-user' : ''}`} >
              <h1 className='cabs-user-heading'>Cab Users Authentication</h1>
              <div className={`table-cabs-user ${sidebar ? 'sidebar-cabs-user' : ''}`}>
                <CabAuthenticationTable val={true} />
              </div>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}


CabAuthentication.propTypes = {};

CabAuthentication.defaultProps = {};

export default CabAuthentication;
