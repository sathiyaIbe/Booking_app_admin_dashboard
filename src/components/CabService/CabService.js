import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../core/header/header';
import Sidebar from '../../core/Sidebar/Sidebar';
import { AiOutlineMenu } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import DataTables from '../../core/DataTables/DataTables';
import Context from '../../services/Context/Context';
import './CabService.css'
import { ApiCapGet } from '../../services/apiCapRegister/apiCapRegister';
import CabUserTable from '../../core/CabUserTable/CabUserTable';
const CabUser = () => {
  return (
    <Context.Consumer>
      {value => {
        const { sidebar, isDark } = value
       
        return (
          <div className="Cabs" data-testid="User">
            <div className='header-cabs-container'>
              <Header />
            </div>
            <div className={`header-body-cabs-container ${sidebar ? 'navbar-cabs-user' : ''}`} >
              <h1 className='cabs-user-heading'>Cab Users</h1>
              <div className={`table-cabs-user ${sidebar ? 'sidebar-cabs-user' : ''}`}>
                <CabUserTable val={true} />
              </div>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}
export default CabUser;
