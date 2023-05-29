import React from 'react';
import PropTypes from 'prop-types';
import './CabBookingTable.css';
import Header from '../../../core/header/header';
import Context from '../../../services/Context/Context';
import CabBookingDataTable from '../../CabBookingDataTable/CabBookingDataTable';
import CarBookingTable from "../../CarBookingTable/CarBookingTable"
import { useState } from 'react';
const CabBookingTable = () => {
  const [booking,setBooking]=useState("cab")
function BookingSelection(){
  switch(booking){
case ("cab"):
  return <CabBookingDataTable />
case("car"):

    return <CarBookingTable/>
  }
}

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
   <div className="field mb-3" style={{width:'300px'}}>
                                <label htmlFor="carType">Bookings Type</label>
                                <div className="formgrid grid">
                                    <select className="form-select" aria-label="Default select example" onChange={(e)=>setBooking(e.target.value)}   >
                                     
                                        <option defaultChecked value="cab"  >Cab Bookings </option>
                                        <option value="car">Car Rental Bookings</option>
                                        
                                    </select>
                                </div>
   </div>
  
   <div className= {`table-cabs-user ${sidebar ?'sidebar-cabs-user' :''}`}>

   {BookingSelection()}
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
