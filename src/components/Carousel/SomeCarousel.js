import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Carousel.css"


const SomeCarousel = () => {
  return (
    <div   className="carousel" >
      <Carousel>
        <Carousel.Item>
          <img
            className="carouselblock"
            src={"./images/с1.jpg"}
            alt="Первый слайд"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carouselblock"
            src={"./images/с2.jpeg"}
            alt="Второй слайд"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
          className="carouselblock"
            src={"./images/с3.jpg"}
            alt="Третий слайд"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SomeCarousel;
