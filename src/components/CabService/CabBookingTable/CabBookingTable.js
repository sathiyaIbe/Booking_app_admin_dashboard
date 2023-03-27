import React from 'react';
import PropTypes from 'prop-types';
import './CabBookingTable.css';
import Header from '../../../core/header/header';
import Context from '../../../services/Context/Context';
import CabBookingDataTable from '../../CabBookingDataTable/CabBookingDataTable';
const CabBookingTable = () => {
  return(
    <Context.Consumer>
    {value=>{
      const {sidebar}=value
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
