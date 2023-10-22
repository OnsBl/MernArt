import React from 'react'
import Navbar2 from '../Navbar/Navbar2'
import Carousel from '../Carousel/Carousel'
import ServicesSection from '../Services/ServicesSection'
import DefaultFooter from '../Footer/DefaultFooter'

function Home() {
  return (
    <div style={{paddingTop: "70px"}}>
       <Navbar2></Navbar2>
        <Carousel></Carousel>
        <ServicesSection></ServicesSection>
        <DefaultFooter></DefaultFooter>
    </div>
  )
}

export default Home