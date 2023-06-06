import React, {  useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import { useNavigate} from 'react-router-dom'
import  {Apilogin}  from '../../services/apilogin/apilogin'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [email, setEmail]=useState('admin@gmail.com')
  const [password, setPassword]=useState('1234567')
  const navigate = useNavigate()
const token=localStorage.getItem('token')
const checkToken=token===null
 useEffect(()=>{
  if (!checkToken){
  return navigate('/admin-dashboard')
} 
},[checkToken])
  const onSubmit=()=>{
    const user={
      email,
      password
    }
    Apilogin(user)
    .then(res=>{
      localStorage.setItem("token", res.data.token)
      toast.success(res.data.message)
      navigate('/admin-dashboard')
    })
    .catch(err=>{
      console.log(err)
      toast.error(err.response.data.message)
    })
  }
  return (
<div className= 'main-login-container'  data-testid="Login">
  <ToastContainer />
        <div className='cons'>
        <div className="card-containers ">
          <div className="img-containers">
      <img src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-12.jpg" className="img-fluid rounded-start" alt="img"/>
    </div>
    <div className='body-containers text-start  '>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <input type="email" className="form-control" id="email" name='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
              </div>
              <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input type="password" className="form-control" id="password" name='password' value={password} onChange={(event) => setPassword(event.target.value)} />
                  </div>
              </div>
              <div>
                <button className='btn w-100 btn-primary' onClick={onSubmit} type='submit'>Login</button>
              </div>
          </div>
        </div>
        </div>
        </div>
  );
}
Login.propTypes = {};
Login.defaultProps = {};
export default Login;
