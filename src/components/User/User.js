import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './User.css';
import Header from '../../core/header/header';
import Sidebar from '../../core/Sidebar/Sidebar';
import { AiOutlineMenu } from 'react-icons/ai'
import {RxCross1} from 'react-icons/rx'
import DataTables from '../../core/DataTables/DataTables';
import Context from '../../services/Context/Context';


const User = () =>{
  const [sidebar, setSidebar]=useState(false)
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);


 return(
  <Context.Consumer>
    {value=>{
      const {sidebar, isDark}=value
     
      return(

   
  <div className="User"  data-testid="User">
  
    <div className='header-user-container'>
   <Header />
   </div>
   <div className= {`header-body-container ${sidebar ?'navbar-user' :''}`} >
   <h1 className='user-heading'>Users</h1>
   <div className= {`table-user ${sidebar ?'sidebar-user' :''}`}>
   <DataTables val={true} />
   </div>
   </div>

  </div>
  )
}}
</Context.Consumer>
)

};

User.propTypes = {};

User.defaultProps = {};

export default User;
