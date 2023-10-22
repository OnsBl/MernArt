import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, register, reset } from '../../Slices/AuthSlice';
import { toast } from 'react-toastify';
import Navbar2 from '../Navbar/Navbar2';

function Register() {
  const [userData, setUserData] = useState({});

  const dispatch = useDispatch();

  const { user, error } = useSelector(state => state.userReducer);
  const navigate = useNavigate();
  const signUp = (e) => {
    e.preventDefault();
    console.log("user data", userData);
    dispatch(register(userData));
 
  }

  useEffect(() => {
    if (user) {
      toast.success('Welcome to our website');
      navigate('/Feed');
    }
    if (error) {
      toast.error(error.message);
      dispatch(reset());
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
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4">
                <div class="form-group">
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <label for="exampleFormControlInput1">Your name</label>
                  <MDBInput  id='form1' type='text' className='w-100' onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                <div class="form-group">
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <label for="exampleFormControlInput1">Your Email</label>
                  <MDBInput  id='form2' type='email' onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                <div class="form-group">
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <label for="exampleFormControlInput1">Password</label>
                  <MDBInput  id='form3' type='password' onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                <div class="form-group">
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <label for="exampleFormControlInput1">Repeat your password</label>
                  <MDBInput  id='form4' type='password' onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })} />
                </div>
                </div>

                <button class="btn btn-outline-primary mb-4" size='lg' type="submit" onClick={signUp}>Register</button>
              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </div>
    </MDBContainer>
    </div>);
}

export default Register;
