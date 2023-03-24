import React from 'react';
import PropTypes from 'prop-types';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { RiHotelFill } from 'react-icons/ri'
import { AiOutlineCar, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsGrid } from 'react-icons/bs'
import { TbBrandBooking } from 'react-icons/tb'
export  const Sidebar=({
  sidebar,
  isDark,
  changeSidebar
})=>
{
  return <Offcanvas show={sidebar} scroll={true} backdrop={false} data-testid="Sidebar" className={`offcanvas offcanvas-start offcanvas-show     sidebar-offcanvas ${isDark && "bg-dark"}`}>
    <div className='sidebar-items-container'>
      <Link to='/admin-dashboard'>  <button className={`sidebar-link ${isDark && "dark-sidebar-link"}`} type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => changeSidebar(true)}><BsGrid className='sidebar-icons' />Dashboard </button></Link>
      <Link to='/user'>  <button className={`sidebar-link ${isDark && "dark-sidebar-link"}`} type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => changeSidebar(true)}><AiOutlineUser className='sidebar-icons' />User </button></Link>
      <li className="nav-item">
        <button data-bs-target="#components-nav" data-bs-toggle="collapse" className={`d-flex sidebar-link ${isDark && "dark-sidebar-link"}`} type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => changeSidebar(true)}><AiOutlineCar className='sidebar-icons mt-1' /> Cab Service  <i className="bi bi-chevron-down ms-auto mt-1"></i></button>
        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li key="1">
            <Link to='/cab-service/cab-user'> <button className={`sidebar-link list-items ${isDark && "dark-sidebar-link"}`} type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => changeSidebar(true)}> <AiOutlineUsergroupAdd className='sidebar-icons' /> Cab User </button></Link>
          </li>
        </ul>
        <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li key='1'>
            <Link to='/cab-service/cab-booking'> <button className={`sidebar-link list-items ${isDark && "dark-sidebar-link"}`} type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => changeSidebar(true)}> <TbBrandBooking className='sidebar-icons' /> Cab Booking </button></Link>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <button data-bs-target="#components-navs" data-bs-toggle="collapse" className={`d-flex sidebar-link ${isDark && "dark-sidebar-link"}`} type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => changeSidebar(true)}><RiHotelFill className='sidebar-icons mt-1' /> Hotel Service  <i className="bi bi-chevron-down ms-auto mt-1"></i></button>
        <ul id="components-navs" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to='/booking-status'><button className={`sidebar-link list-items ${isDark && "dark-sidebar-link"}`} type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => changeSidebar(true)}> <AiOutlineUsergroupAdd className='sidebar-icons' /> Hotel User  </button></Link>
          </li>
          <li>
            <Link to='/hotel/hotelbookings'><button className={`sidebar-link list-items   ${isDark && "dark-sidebar-link"}`} type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => changeSidebar(true)}> <TbBrandBooking className='sidebar-icons' /> Hotel Bookings  </button></Link>
          </li>
        </ul>
      </li>
    </div>
  </Offcanvas>;
}


