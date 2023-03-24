import React from 'react';
import PropTypes from 'prop-types';
import './NotFound.css';
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="NotFound" data-testid="NotFound">
    
    <img src='https://img.freepik.com/free-vector/web-search-concept-illustration_114360-4767.jpg' alt='not-found'/>
    <h1>Not Found URL </h1>
    <p>Back to the main page </p>
    <Link to='/admin-dashboard'>Click Here</Link>

  </div>
);

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
