import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'


export const Apilogin  = async (user) => {
 
 
  return await axios.post('http://localhost:8080/api/login', user)
}

Apilogin.propTypes = {};

Apilogin.defaultProps = {};

