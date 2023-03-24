import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export  const ApiCapRegister =  async (details) =>{
    console.log(details)
    return await axios.post('http://localhost:5000/cab/api/cabRegister', details )
};

export const ApiCapUser= async ()=>{
    return await axios.get('http://localhost:8080/search/api/cabUserDetails')
};


export const DeleteCabUserApi=async(id)=>{
    return await axios.delete(`http://localhost:8080/search/api/cabUserDetails/${id}`)
  }
  
  
  export const DeleteMultipleCabUserApi=async (data)=>{
    return await axios.delete("http://localhost:8080/search/api/cabUserDetails" , {data})
  }
  
  
  export const UpdateCabUserApi=async(data)=>{
    console.log(data)
  
    return await axios.put('http://localhost:8080/search/api/cabUserDetails', data)
  }
  export const CabService=async(data)=>{
    return await axios.post('http://localhost:8080/search/api/cabRegister', data)
  }

  export const ImportCabUser=async(data)=>{
    return await axios.post('http://localhost:8080/search/api/cabRegister/importCabUser', data)
  }
  export const ImportCabDetail=async(data)=>{
    return await axios.post('http://localhost:8080/search/api/cabRegister/importCabDetail', data)
  }
  
  export const CabBooking=async()=>{
    return await axios.get('http://localhost:8080/booking/api/cabbookingdetailsall')
  }

ApiCapRegister.propTypes = {};

ApiCapRegister.defaultProps = {};

