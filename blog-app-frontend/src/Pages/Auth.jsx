import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"; 
import { BsPersonFill } from 'react-icons/bs';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { loginAPI, registerAPI } from '../../Services/AllAPIs';



function Auth({register}) {

  const navigate=useNavigate()

  const[userData,setUserData]=useState({
    username:"",
    email:"",
    password:""

  })
  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!userData.username || !userData.email || !userData.password) {
      alert('Please fill the form');
      return;
    }
  
    try {
      // API call to register
      const result = await registerAPI(userData);
  
      if (result.status === 300) {
        Swal.fire({
          title: 'Success',
          text: 'Successfully registered',
          icon: 'success',
          confirmButtonText: 'Back',
        });
  
        setUserData({
          username: "",
          email: "",
          password: "",
        });
  
        // Navigate to login page
        navigate('/login');
      } else if (result.response && result.response.status === 406) {
        Swal.fire({
          title: 'Error',
          text: result.response.data,
          icon: 'error',
          confirmButtonText: 'Back',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred',
        icon: 'error',
        confirmButtonText: 'Back',
      });
      console.error('Registration error:', error);
    }
  
    console.log(userData);
  };
  


  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!userData.email || !userData.password) {
      alert('Please fill the form');
      return;
    }
  
    try {
      // API call to login
      const result = await loginAPI(userData);
  
      if (result.status === 200) { // Assuming 200 is the correct status for a successful login
        sessionStorage.setItem("username", result.data.existingUser.username);
        sessionStorage.setItem("token", result.data.token);
  
        Swal.fire({
          title: 'Success',
          text: 'Login successful',
          icon: 'success',
          confirmButtonText: 'Back',
        });
  
        setUserData({
          username: "",
          email: "",
          password: "",
        });
  
        // Navigate to homepage
        navigate('/');
      } else if (result.response && result.response.status === 404) {
        Swal.fire({
          title: 'Error',
          text: result.response.data,
          icon: 'error',
          confirmButtonText: 'Back',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred',
        icon: 'error',
        confirmButtonText: 'Back',
      });
      console.error('Login error:', error);
    }
  
    console.log(userData);
  };
  
 
  return (

    
    <div>

<MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/' className='text-black fw-bold'>
          <BsPersonFill className='fs-3 text-black mx-3' />
          <h2>BLOGS</h2>
        </MDBNavbarBrand>
       
      </MDBContainer>
    </MDBNavbar>
    
      
        <div>
          <form className='shadow bg-light m-5 p-1' style={{width:'600px'}}>
            <p className='text-center text-black mt-3'>blogs</p>
           <p className='text-center text-black'>
           {
              register? 'Register Here...':'Login Here...'
            }
           </p>

            <div className='mx-1 px-5 mt-3'>
              {
                register&&
                <input onChange={e => setUserData({ ...userData, username: e.target.value })} value={userData.username} type="text" placeholder='Username' className='form-control mb-2' />
              }
                <input onChange={e => setUserData({ ...userData, email: e.target.value})} value={userData.email} type="email" placeholder='email' className='form-control mb-2'/>
                <input onChange={e => setUserData({ ...userData, password :e.target.value})} value={userData.password} type="password" placeholder='password'className='form-control mb-2' />
            </div>
            <div>
              {
                register ? 
                <div className='text-center m-4'>
                  <button onClick={handleRegister} className='btn btn-dark m-2'>Register</button>
                  <p className='text-black'>Already registred?  <Link to={'/login'}>Login here...</Link></p>
                </div>:
                <div className='text-center m-4'>
                  <button onClick={handleLogin} className='btn btn-dark m-2'>Login</button>
                  <p className='text-black'>New to here? <Link to={'/register'}>Register here...</Link></p>
                </div>
              }
            </div>

          </form>
        </div>
      </div>
  )
}

export default Auth