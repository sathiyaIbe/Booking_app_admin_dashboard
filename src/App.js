import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route ,   BrowserRouter  } from 'react-router-dom'
import './App.css';
import Context from './services/Context/Context';
import { CSpinner } from '@coreui/react'

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const  Login =lazy(()=>import('../src/components/Login/Login')) 
const AdminDashboard =lazy(()=>import('./components/AdminDashboard/AdminDashboard')) 
const Protected =lazy(()=>import('./services/ProtectedRoute/ProtectedRoute')) 
const NotFound =lazy(()=>import('./components/NotFound/NotFound'))

const BookingStatus =lazy(()=>import('./components/BookingStatus/BookingStatus'))
const CabService =lazy(()=>import('./components/CabService/CabService')) 
const User=lazy(()=>import('./components/User/User'))


const  ECommerce =lazy(()=> import('./components/ECommerce/ECommerce'))
const CabBookingTable=lazy(()=>import('./components/CabService/CabBookingTable/CabBookingTable'))

const HotelBooking =lazy(()=>import('./components/BookingStatus/HotelBooking/HotelBooking'))

function App() {
      const [sidebar, setSidebar]=useState(false)
      const [isDark, setIsDark] = useState(false);
      function changeSidebar (val){
      
        setSidebar(val)
      }
      function changesTheme(){
        setIsDark(!isDark)
      }




  return (
    
    <div className="App" data-testid="app">
      <Context.Provider 
      value={{sidebar, changeSidebar:changeSidebar, isDark, changeTheme:changesTheme}}>
      <BrowserRouter>
      <Suspense fallback={<CSpinner color='primary'/>}>
      <Routes>
        <Route exact path='/' element={<Protected ><Login /> </Protected>}></Route>
        <Route exact path ='/admin-dashboard' element={<Protected ><AdminDashboard /> </Protected>}></Route>
        <Route exact path ='/e-commerce' element={<Protected ><ECommerce /> </Protected>}></Route>
        <Route exact path ='/user' element={<Protected ><User /> </Protected>}></Route>
        <Route exact path ='/booking-status' element={<Protected ><BookingStatus /> </Protected>}></Route>
       
        <Route exact path ='/cab-service/cab-user' element={<Protected ><CabService /> </Protected>}></Route>
        <Route exact path='/cab-service/cab-booking' element={<Protected ><CabBookingTable /> </Protected>}></Route>
        <Route exact path='/hotel/hotelbookings' element={<Protected><HotelBooking /> </Protected>}></Route>
        <Route path='*' element={<NotFound />}></Route>
        </Routes>
        </Suspense>
      </BrowserRouter>
    
      </Context.Provider>
    </div>
  );
}

export default App;
