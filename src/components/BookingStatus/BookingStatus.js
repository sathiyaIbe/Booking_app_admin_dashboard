import React from 'react';
import PropTypes from 'prop-types';
import './BookingStatus.css';
import Header from '../../core/header/header';
import Context from '../../services/Context/Context';
import HotelUserTable from '../hotelUserTable/hotelUserTable';
const BookingStatus = () => {
  return(
    <Context.Consumer>
      {value=>{
        const {sidebar}=value
        return(
  <div className="BookingStatus" data-testid="BookingStatus">
    <div className='header-hotel-container'>
    <Header  />
    </div>
    <div className= {`header-body-cabs-container ${sidebar ?'navbar-cabs-user' :''}`} >
       <h1 className='cabs-user-heading'>Hotel Users</h1>
       <div className= {`table-cabs-user ${sidebar ?'sidebar-cabs-user' :''}`}>
       <HotelUserTable val={true} />
       </div>
       </div>
    <div className={`booking-status-body-container ${sidebar ?'sidebar-booking-status' :''}`}>
   </div>
  </div>
   )
  }}
</Context.Consumer>
)
  }
BookingStatus.propTypes = {};
BookingStatus.defaultProps = {};
export default BookingStatus;
