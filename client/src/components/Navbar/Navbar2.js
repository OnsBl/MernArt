import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar2.css'


function Navbar2() {
  const navigate=useNavigate()
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
                <Link to="/" className="nav-link">Home</Link> 
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
           
              
            </ul>
          </div>
          <div className="d-flex" align-items-center>
          <Link to="/Login" className="nav-link" style={{ marginRight: '12px', lineHeight: 3 }}>
              Login
            </Link>
          

              <button type="button" className="btn btn-outline-dark" onClick={()=>{ navigate("/Register")}}>Register</button>
            
          </div>
        </div>
      </nav>

     
    </div>
  );
}

export default Navbar2;
