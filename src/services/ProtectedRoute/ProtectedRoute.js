import {useEffect} from 'react';

import PropTypes from 'prop-types';

import {useNavigate} from "react-router-dom"



const Protected = ({children}) => {
   const navigate=useNavigate()
  const token=localStorage.getItem('token')
  

 const checkToken=token===null
  useEffect(() => {
    if (checkToken){
        navigate("/", {replace:true});
    }
 },[checkToken]);

return children

};

Protected.propTypes = {};

Protected.defaultProps = {};

export default Protected;
