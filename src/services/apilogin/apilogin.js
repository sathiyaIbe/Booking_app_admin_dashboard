import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'


export const Apilogin  = async (user) => {
  console.log(process.env.REACT_APP_BACKEND)
 
  return await axios.post(`${process.env.REACT_APP_BACKEND}api/login`, user)
}

Apilogin.propTypes = {};

Apilogin.defaultProps = {};

