import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './style.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showDetail } from '../../Slices/detailSlice';

const ProductBox = ({ mediaPath, title, description, price, user, _id }) => {
  const [workData, setWorkData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    setWorkData({
      work: _id,
      user: user,
      title: title,
      description: description,
      price: price,
      mediaPath: mediaPath,
    });
  }, [_id, user, title, description, price, mediaPath]);

  const showD = (e) => {

    dispatch(showDetail(workData));
    navigate('/detail');
  }

  return (
    <div className="box">
    <div className="product-info">
      <div className="product-image-container">
        <img src={mediaPath} alt={title} className="product-image" />
      </div>
      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{description}</p>
      </div>
      <span className="product-price">${price}</span>
    </div>
    <div className='floating-button'>
      <Button variant="outline-primary" onClick={showD}>Details</Button>
    </div>
  </div>
  );
};

export default ProductBox;
