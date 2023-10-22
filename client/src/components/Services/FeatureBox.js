
import React from 'react';
import './ServicesSection.css'

const FeatureBox = ({ icon, title, description }) => {
  return (
    <div className="col-sm-6 col-lg-4">
      <div className="feature-box-1">
        <div className="icon">
          <i className={`fa ${icon}`}></i>
        </div>
        <div className="feature-content">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureBox;
