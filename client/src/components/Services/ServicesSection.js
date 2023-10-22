
import React from 'react';
import FeatureBox from './FeatureBox';
import './ServicesSection.css'


const ServicesSection = () => {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="section-title">
              <h2>Our services</h2>
              <p>Experience Art Excellence Through Our Comprehensive Artwork Services</p>
            </div>
          </div>
        </div>
        <div className="row">
  <div className="col-sm-4">
    <div className="feature-box-1">
      <div className="icon">
        {/* Add your icon or image here */}
      </div>
      <div className="feature-content">
        <h5>Portrait</h5>
        <p>Preserve Moments in Time with Exquisite Charcoal Portraits</p>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div className="feature-box-1">
      <div className="icon">
        <i className="fa fa-cog"></i> {/* Use className for React */}
      </div>
      <div className="feature-content">
        <h5>Digital Art</h5>
        <p>Where Pixels and Passion Converge: Digital Artistry new world</p>
      </div>
    </div>
  </div>
  
  <div className="col-sm-4">
    <div className="feature-box-1">
      <div className="icon">
        {/* Add your icon or image here */}
      </div>
      <div className="feature-content">
        <h5>Portrait</h5>
        <p>Preserve Moments in Time with Exquisite Charcoal Portraits</p>
      </div>
    </div>
  </div>
</div>

       
      </div>
    </section>
  );
};

export default ServicesSection;
