import { Sidebar } from '../Sidebar/Sidebar';
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import Context from '../../services/Context/Context';
import { useNavigate } from 'react-router-dom'
import { HiLogout } from 'react-icons/hi'
import { BsPersonCircle } from 'react-icons/bs'
import { BsGear } from 'react-icons/bs'
import { Avatar } from 'primereact/avatar';
import { AiOutlineUser } from 'react-icons/ai';
import { RiHotelFill } from 'react-icons/ri'
import { AiOutlineCar, AiOutlineSearch, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiCarSeat } from 'react-icons/gi'
import { BsGrid } from 'react-icons/bs'
import { TbBrandBooking } from 'react-icons/tb'
import { Button } from 'primereact/button';
import { icons } from 'react-icons';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import ToggleButton from "react-theme-toggle-button";
import "react-theme-toggle-button/dist/index.css";
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import BookingStatus from '../../components/BookingStatus/BookingStatus'
import { SlMenu } from 'react-icons/sl'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { color } from '@mui/system';
import Offcanvas from 'react-bootstrap/Offcanvas';
const Header = props => {
  const showNav = true
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.removeItem('token')
   
    navigate('/')
  }
  return (
    <Context.Consumer>
      {value => {
        const { sidebar, changeSidebar, isDark, changeTheme } = value
        return (
          <div className={`header ${isDark && "dark-header"}`} data-testid="Header">
            <div className={`header-container-new ${isDark && "dark-header-container"}`}>
              <div className='container-new'>
                <Link style={{ textDecoration: 'none' }} to='/admin-dashboard'><button className={`admin-link ${isDark && "dark-admin-link"}`} type='button' onClick={() => { sidebar && changeSidebar(true) }}> Booking Admin </button></Link>
                <div className='search-container'>
                  <button className=" menu" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" onClick={() => changeSidebar(!sidebar)}><SlMenu className="menu-icon" /></button>
                  <div className="search-bar">
                    <form className="search-form d-flex align-items-center">
                      <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                      <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                    </form>
                  </div>
                </div>
              </div>
              <div className='toogle-container'>
                {/* <ss   isDark={isDark} changeTheme={changeTheme}  />*/}
                <Popup arrow={false} trigger={<button type='button' className='menu-bar'> <Avatar className='avatar' label="A" size='xlarge' shape="circle" /></button>} position="center">
                  <div className={`menu-container ${isDark && "dark-menu-container"}`}>
                    <button type='button' className={isDark ? "dark-menu-items" : "menu-items"}><BsPersonCircle className='popup-icon' />  Profile</button>
                    <hr className='hrs' />
                    <button type='button' className={isDark ? "dark-menu-items" : "menu-items"}><BsGear className='popup-icon' />  Settings</button>
                    <hr className='hrs' />
                    <button type='button' className={isDark ? "dark-menu-items" : "menu-items"} onClick={() => [changeSidebar(false), logoutHandler()]}  ><HiLogout className='popup-icon' label='logout' />  Logout</button>
                  </div>
                </Popup>
              </div>
            </div>
            <Sidebar sidebar={sidebar} isDark={isDark} changeSidebar={changeSidebar} />
          </div>
        );
      }
      }
    </Context.Consumer>
  )
}
Header.propTypes = {};
Header.defaultProps = {};
export default Header;

    function ss({isDark, changeTheme}) {
      return (<div className='toogle-icon'>
  <ToggleButton isDark={isDark} onChange={() => changeTheme()} />
</div>);
    }
  