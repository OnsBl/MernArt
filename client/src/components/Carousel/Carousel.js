import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import React from 'react'

function Carousel() {
  return (
    <div> 
    <MDBCarousel showIndicators showControls fade>
  <MDBCarouselItem
    className="w-100 d-block"
    itemId={1}
    src="https://i.pinimg.com/originals/36/df/43/36df43ee8c318630c6080ced57ea572e.jpg"
    alt="..."
  >
    <h5>First slide label</h5>
    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  </MDBCarouselItem>

  <MDBCarouselItem
    className="w-100 d-block"
    itemId={2}
    src="https://img.freepik.com/photos-premium/illustration-coloree-personnes-assises-table-ordinateur-portable_985342-60.jpg"
    alt="..."
  >
    <h5>Second slide label</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </MDBCarouselItem>
</MDBCarousel></div>
  )
}

export default Carousel