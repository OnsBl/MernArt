import React, { useState, useEffect } from 'react';
import './detail.css';
import Navbar1 from '../Navbar/Navbar1';
import { MDBInput } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../Slices/orderSlice';

function Detail() {
  const [quantity, setQuantity] = useState(1); 
  const { detail } = useSelector((state) => state.detailReducer);
  const dispatch = useDispatch();

  const passOrder = async (e) => {
    const buyerLocal = JSON.parse(localStorage.getItem('user'));
    const buyer = buyerLocal.userid;

    
    const totalAmount = quantity * detail.price;

    const orderData = {
      user: detail.user,
      work: detail.work,
      title: detail.title,
      description: detail.description,
      buyer: buyer,
      total: totalAmount,
    };
    console.log('my order', orderData);

    dispatch(addOrder(orderData));
  }

  return (
    <div className="container3">
      <Navbar1></Navbar1>
      <div className="box2">
        <div className="images">
          <div className="img-holder active">
            <img
              src="https://images.rtl.fr/~c/1200v800/rtl/www/1095331-l-art-de-multiples-bienfaits.jpg"
              alt="Headphone"
            />
          </div>
        </div>

        <div className="basic-info">
          <h1>{detail ? detail.title : 'Loading...'}</h1>
          <span>{detail ? `$ ${detail.price}` : 'Loading...'}</span>
          <div className="description">
            <p>
              {detail ? detail.description : 'Loading...'}
            </p>
            <MDBInput
              id="typeNumber"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1" 
            />
          
          {detail && (
            <p>Total Amount: ${quantity * detail.price}</p>
          )}
          <div className="options">
          <button class="btn btn-outline-primary mb-4" size='lg' type="submit" onClick={passOrder} >Pass order</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
