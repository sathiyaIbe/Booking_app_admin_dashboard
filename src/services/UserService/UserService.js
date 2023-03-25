import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
export const GetUserDetailsApi=async()=>{
  return await axios.get('http://localhost:8080/user/api/userRegister',)
}
export const CountUserApi=async()=>{
  return await axios.get('http://localhost:8080/user/api/usersCount')
}
export const ChartDataApi=async()=>{
  return await axios.get('http://localhost:8080/admin/api/adminDatas')
}
export const TotalAdminData=async()=>{
  return await axios.get('http://localhost:8080/admin/api/adminData/data')
}
export const GetUser=async()=>{
  return await axios.get('http://localhost:8080/authentication/api/getuser')
}
export const UpdateUser=async(data)=>{
  return await axios.put('http://localhost:8080/authentication/api/updateuser',data)
}
export const RegisterUser=async(data)=>{
  return await axios.post('http://localhost:8080/authentication/api/registeruser', data)
}
export const DeleteUser=async(data)=>{
  return await axios.delete(`http://localhost:8080/authentication/api/deleteuser${data}`)
}
export const ImportUser=async(data)=>{
  return await axios.post('http://localhost:8080/authentication/api/importuser', data)
}
