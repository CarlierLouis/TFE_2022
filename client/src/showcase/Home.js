import React from 'react';
import { Carousel } from 'react-bootstrap';
import Card from '../common/UIElements/Card';
import News from './News';
import Map from './Map';
import Footer  from './Footer';
import Button from '../common/FormElements/Button';

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

<Card className='home-card-div'><elem style={{maxWidth: '50%'}}><h1>Présentation de notre école.</h1> 
Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. 
Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. 
Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. 
Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. 
Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. 
Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. 
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. 
Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. 
Aenean ut orci vel massa suscipit pulvinar. 
Nulla sollicitudin. 
Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. 
Pellentesque rhoncus nunc et augue. 
</elem></Card><br></br>

<div className='home-youtube-video-div'>
  <iframe className='home-youtube-video'
    src={props.homevideo} 
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
    title="video"
  />
</div>


<News school={props.school} numberofnews={props.numberofnews}/>
<br></br>
<div className='news-link'>
  <Button href={`/${props.school}/actu`}>Voir toutes les actualités</Button>
</div>
<br></br><br></br>
<Map lat={props.lat} lng={props.lng} />
<Footer title={props.title} addresse={props.addresse}/>
</div>


    )
}

export default Home;