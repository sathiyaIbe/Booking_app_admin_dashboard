import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CabBookingTable.css';
import Header from '../../../core/header/header';
import Sidebar from '../../../core/Sidebar/Sidebar';
import { AiOutlineMenu } from 'react-icons/ai'
import {RxCross1} from 'react-icons/rx'
import DataTables from '../../../core/DataTables/DataTables';
import Context from '../../../services/Context/Context';
import { ApiCapGet } from '../../../services/apiCapRegister/apiCapRegister';
import CabUserTable from '../../../core/CabUserTable/CabUserTable';
import CabBookingDataTable from '../../../core/CabBookingDataTable/CabBookingDataTable';


const CabBookingTable = () => {
  return(
    <Context.Consumer>
    {value=>{
      const {sidebar, isDark}=value
     
      return(
        <div className="CabBookingTable" data-testid="CabBookingTable">
  
    <div className='header-cabs-container'>
   <Header />
   </div>
   <div className= {`header-body-cabs-container ${sidebar ?'navbar-cabs-user' :''}`} >
   <h1 className='cabs-user-heading'>Cab Bookings</h1>
   <div className= {`table-cabs-user ${sidebar ?'sidebar-cabs-user' :''}`}>
   <CabBookingDataTable val={true} />
   </div>
   </div>

  </div>
  )
}}
</Context.Consumer>
)
}

CabBookingTable.propTypes = {};

CabBookingTable.defaultProps = {};

export default CabBookingTable;
