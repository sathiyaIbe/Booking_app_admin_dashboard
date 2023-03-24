import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export const UserService=async(details)=>{
  return await axios.post('http://localhost:5000/user/api/userRegister', details)
}

export const GetUserDetailsApi=async()=>{
 
  return await axios.get('http://localhost:5000/user/api/userRegister',)
}

export const DeleteUserApi=async(id)=>{
 

  return await axios.delete(`http://localhost:5000/user/api/userRegister/${id}`)
}


export const DeleteMultipleUserApi=async (data)=>{
 
  return await axios.delete("http://localhost:5000/user/api/userRegister" , {data})
}


export const UpdateUserApi=async(data)=>{

  return await axios.put('http://localhost:5000/user/api/userRegister', data)
}

export const CountUserApi=async()=>{
  return await axios.get('http://localhost:5000/user/api/usersCount')
}

export const ChartDataApi=async()=>{
  return await axios.get('http://localhost:5000/admin/api/adminDatas')
}

export const TotalAdminData=async()=>{
  return await axios.get('http://localhost:5000/admin/api/adminData/data')
}

export const importUser=async(data)=>{
  return await axios.post('http://localhost:5000/user/api/userImport', data)
}


export const GetUser=async()=>{
  return await axios.get('http://localhost:8080/authentication/api/getuser')
}






UserService.propTypes = {};

UserService.defaultProps = {};


