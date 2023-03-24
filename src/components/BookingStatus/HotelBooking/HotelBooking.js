import PropTypes from 'prop-types';
import './HotelBooking.css';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Header from '../../../core/header/header';
import Sidebar from '../../../core/Sidebar/Sidebar';
import { AiOutlineMenu } from 'react-icons/ai'
import {RxCross1} from 'react-icons/rx'
import DataTables from '../../../core/DataTables/DataTables';
import Context from '../../../services/Context/Context';
import { ApiCapGet } from '../../../services/apiCapRegister/apiCapRegister';
import CabBookingDataTable from '../../../core/CabBookingDataTable/CabBookingDataTable';
import HotelBookingTable from '../../../core/HotelBookingTable/HotelBookingTable'


const HotelBooking = () =>{
  return(
<Context.Consumer>
{value=>{
  const {sidebar, isDark}=value

  return(
  <div className="HotelBooking" data-testid="HotelBooking">
   <div className='header-cabs-container'>
   <Header />
   </div>
   <div className= {`header-body-cabs-container ${sidebar ?'navbar-cabs-user' :''}`} >
   <h1 className='cabs-user-heading mt-3 mb-3'>Hotel Bookings</h1>
   <div className= {`table-cabs-user p-2 ps-3 ${sidebar ?'sidebar-cabs-user' :''}`}>
   <HotelBookingTable val={true} />
   </div>
   </div>

  </div>
  )
}}
</Context.Consumer>
)
}

HotelBooking.propTypes = {};

HotelBooking.defaultProps = {};

export default HotelBooking;
