import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import FirstImage from '../images/1.jpg'; // Путь к первому изображению
import SecondImage from '../images/2.jpg'; // Путь ко второму изображению
import ThirdImage from '../images/3.jpg'; // Путь к третьему изображению


const SomeCarousel = () => {
  return (
    <div  style={{ width: '60%', height: '40%', margin: 'auto', paddingTop: '60px'}} >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={SecondImage}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src={FirstImage}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src={ThirdImage}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SomeCarousel;
