import React, { useEffect } from 'react';
import './feed.css';
import Navbar1 from '../Navbar/Navbar1';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { getWorksAll, reset } from '../../Slices/WorkSlice';





import './style.css';
import DefaultFooter from '../Footer/DefaultFooter';


function Feed() {
  

const { works } = useSelector((state) => state.workReducer);
const dispatch = useDispatch();

useEffect(() => {
  const localuser = JSON.parse(localStorage.getItem('user'));
  if (localuser && localuser.userid) {
    const userid = localuser.userid;
    console.log('initial', userid);
    console.log('id', userid);
    dispatch(getWorksAll({ userid }));
    console.log('all', works);
  }
}, [dispatch]);


  return (
    <div  >
      <Navbar1></Navbar1>
      <div className="container2" style={{ paddingTop: "90px" }}>
        {works.map((product, index) => (
          <Card key={index} {...product} />
        ))}
      </div>
      <DefaultFooter ></DefaultFooter>
    </div>
  );
}

export default Feed;
