import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


const SomeCarousel = () => {
  return (
    <div  style={{ width: '70%', height: '40%', margin: 'auto', paddingTop: '60px'}} >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={"./images/с1.jpg"}
            alt="Первый слайд"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src={"./images/с2.jpeg"}
            alt="Второй слайд"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src={"./images/с3.jpg"}
            alt="Третий слайд"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SomeCarousel;
