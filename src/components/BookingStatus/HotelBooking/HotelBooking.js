import PropTypes from 'prop-types';
import './HotelBooking.css';
import React from 'react';
import Header from '../../../core/header/header';
import Context from '../../../services/Context/Context';
import HotelBookingTable from '../../../core/HotelBookingTable/HotelBookingTable'
const HotelBooking = () =>{
  return(
<Context.Consumer>
{value=>{
  const {sidebar}=value
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
