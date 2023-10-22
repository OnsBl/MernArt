import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBCardImage,
  MDBCardBody,
  MDBCard
}
from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { login, reset, setUserRole } from '../../Slices/AuthSlice';
import {useNavigate} from 'react-router-dom'
import Navbar2 from '../Navbar/Navbar2';
import input from 'bootstrap'

function Login() {
 

  const [userData,setuserData]=useState({})
    
    
  const dispatch=useDispatch()

  const {user,error}=useSelector(state=>state.userReducer)
  const navigate=useNavigate()

  const signIn = async (e) => {
    e.preventDefault();
  
    const localuser = JSON.parse(localStorage.getItem('user'));
    if (localuser && localuser.userid) {
    
      navigate('/feed');
    } else {

      const response = await dispatch(login(userData));
      console.log('payload', response.payload);
  
      if (response.payload.user) {
        navigate('/feed');
      }
    }
  }

  useEffect(() => {
  
    const localuser = JSON.parse(localStorage.getItem('user'));
    if (localuser && localuser.userid) {
   
      navigate('/feed');
    } else {
     
      console.log('user', user);
       if (user ) {
        toast.success('Welcome to our website');
        navigate('/feed');
      } 
      if (error) {
        toast.error(error.message);
        dispatch(reset());
      }
      localStorage.setItem('userType', 'buyer');
    }
  }, [user, error]);
 
  return (
    <div style={{paddingTop: "70px"}}>
    <Navbar2></Navbar2>
   
      <MDBContainer fluid>
      <div > 
        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                    <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
              </MDBCol>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <div class="form-group">
           <label for="exampleFormControlInput1">Email address</label>
            <MDBInput
                  wrapperClass='mb-4'
               
                  id='exampleFormControlInput1'
                  type='email'
                  size='lg'  onChange={(e) => setuserData({ ...userData, email: e.target.value })} 
                />
  
            </div>
            <div class="form-group">
            <label for="exampleFormControlInput1">Email address</label>      
                <MDBInput
                  wrapperClass='mb-4'
    
                  id='formControlLg'
                  type='password'
                  size='lg'
                  onChange={(e) => setuserData({ ...userData, password: e.target.value })}
                />
                <button class="btn btn-outline-primary mb-4" size='lg' type="submit" onClick={signIn}>Sign In</button>
                </div>
              </MDBCol>
           

              
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
  </div> );
}

export default Login;