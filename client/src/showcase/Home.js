import React from 'react';
import { Carousel } from 'react-bootstrap';
import Card from '../common/UIElements/Card';

import './Home.css';

const Home  = props => {
    return(
<div>
<Carousel variant="dark" className='caroussel-div'>
<Carousel.Item>
  <img
    className="d-block w-100"
    src={props.caroussel1}
    alt="First slide"
  />
</Carousel.Item>
<Carousel.Item>
  <img
    className="d-block w-100"
    src={props.caroussel2}
    alt="Second slide"
  />
</Carousel.Item>
<Carousel.Item>
  <img
    className="d-block w-100"
    src={props.caroussel3}
    alt="Third slide"
  />
</Carousel.Item>
</Carousel>


<Card className='home-card-div'><a style={{maxWidth: '50%'}}>okzzzzzzzzzzzzzzzzzzzokzzzzzzzzzzzzzzzzzzz
okzzzzzzzzzzzzzzzzzzz
vokzzzzzzzzzzzzzzzzzzz
okzzzzzzzzzzzzzzzzzzz
okzzzzzzzzzzzzzzzzzzz
okzzzzzzzzzzzzzzzzzzz</a></Card>
</div>

    )
}

export default Home;