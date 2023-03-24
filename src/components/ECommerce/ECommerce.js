import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ECommerce.css';
import Sidebar from '../../core/Sidebar/Sidebar';
import Header from '../../core/header/header';
import { AiOutlineMenu } from 'react-icons/ai'
import {RxCross1} from 'react-icons/rx'
import Context from '../../services/Context/Context';


const ECommerce = () =>{
  

  const menuIcon= true ?  <RxCross1 className='menu-icon'/> :<AiOutlineMenu className='menu-icon'/>

  return (
    <Context.Consumer>
      {value=>{
        const {sidebar}=value
        return(


  <div className="ECommerce" data-testid="ECommerce">
     
  
<div>
   <Header />
   <div  className={`e-commerce-body-container ${sidebar ?'sidebar-ecommerce' :''}`}>
   <h1 className='e-commerce-heading'>E-Commerce Page</h1>

   </div>
  
   </div>
   
  </div>
          )
        }}
      </Context.Consumer>
);
  }

ECommerce.propTypes = {};

ECommerce.defaultProps = {};

export default ECommerce;
