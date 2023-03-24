import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const getHotelDetails=async () =>{
    return await axios.get('http://localhost:8080/hotel/api/hoteldetails')
}
export const registerHotel=async(data)=>{
    return await axios.post('http://localhost:8080/hotel/api/hotelRegister', data)
}
export const hotelBookingDetails=async()=>{
    return await axios.get('http://localhost:8080/hotelbooking/api/getBookings')
}
export const updateHotelDetails=async (data)=>{
    return await axios.put('http://localhost:8080/hotel/api/hoteldetailsupdate', data)
}
export const deleteHotel=async(id)=>{
    return await axios.delete(`http://localhost:8080/hotel/api/hoteldetails/${id}`)
}

export const importHotel=async(data)=>{
    return await axios.post('http://localhost:8080/hotel/api/hotelRegister/import', data)
}

