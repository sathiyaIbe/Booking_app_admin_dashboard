import React from 'react';
import PropTypes from 'prop-types';


const Context = React.createContext({
  sidebar:false,
  isDark:false,
  onChange: ()=>{
  }
})

Context.propTypes = {};

Context.defaultProps = {};


export default Context