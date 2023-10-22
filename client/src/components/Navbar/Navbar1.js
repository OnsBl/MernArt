import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../../Slices/AuthSlice';
import { useDispatch } from 'react-redux';

function Navbar1() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('buyer');
  const dispatch=useDispatch()

  useEffect(() => {
 
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType === 'seller') {
      setUserType('seller');
    }
  }, []);

  const handleSwitchUserType = () => {
    if (userType === 'buyer') {
      localStorage.setItem('userType', 'seller');
      setUserType('seller');
      navigate('/Works');
    } else {
      localStorage.setItem('userType', 'buyer');
      setUserType('buyer');
      navigate('/Feed');
    }
  };
  const disconnect = () => {
    dispatch(logout()); 
    navigate("/")
   
  };



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            Arter
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
             
             
              <li className="nav-item">
                <Link to="/feed" className="nav-link">
                  Art works
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/History" className="nav-link">
                  Order history
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
          <Link to="/" onClick={disconnect} className="nav-link" style={{ marginRight: '12px', lineHeight: 3 }}>
              Logout
            </Link>
            {userType === 'buyer' ? (
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleSwitchUserType}
              >
                Switch to Seller
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleSwitchUserType}
              >
                Switch to Buyer
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar1;
