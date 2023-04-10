import React from 'react';
import PropTypes from 'prop-types';
import './CabBookingCancel.css';
import Context from '../../../services/Context/Context';
import Header from '../../../core/header/header';
import CabCancelRequestTable from '../../CabCancelRequestTable/CabCancelRequestTable';
const CabBookingCancel = () => (
  <Context.Consumer>
{value=>{
  const {sidebar}=value

  return(
    
  <div className="CabBookingCancel" data-testid="CabBookingCancel">
    <Header />
    <div className= {`header-body-cabs-container ${sidebar ?'navbar-cabs-user' :''}`} >
    <h1 className='cabs-user-heading'>Cab Bookings Cancel Request</h1>
    <div className= {`table-cabs-user ${sidebar ?'sidebar-cabs-user' :''}`}>
   <CabCancelRequestTable />
   </div>
   </div>
   
    
  </div>
  )
  }}
  </Context.Consumer>
);

CabBookingCancel.propTypes = {};

CabBookingCancel.defaultProps = {};

export default CabBookingCancel;
