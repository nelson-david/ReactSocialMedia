import React from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from "mdbreact";


const Carousel = (props) => {

  return (
    <MDBCarousel
      activeItem={1}
      length={props.imageData.length}
      showControls={true}
      showIndicators={true}
      autoPlay={false}
      className="z-depth-1"
      slide
    >
      <MDBCarouselInner>
        {props.imageData.map((value, index) => {
          return (
            <MDBCarouselItem itemId={index + 1} key={index}>
              <MDBView>
                <img
                  className="card-img-top"
                  src={`https://davidnode-api.herokuapp.com/static/img/${value}`}
                  alt="DataImages"
                />
              </MDBView>
            </MDBCarouselItem>
          )
        })}
      </MDBCarouselInner>
    </MDBCarousel>
  )
}

export default Carousel;
