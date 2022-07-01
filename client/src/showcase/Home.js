import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Card from '../common/UIElements/Card';
import News from './News';
import Map from './Map';
import Footer  from './Footer';
import Button from '../common/FormElements/Button';
import MainNavigation from '../common/navigation/MainNavigation';

import './Home.css';

const Home  = props => {
  const school = useParams().school;

    return(
<div>

  {school == "grand-hallet" && 
      <MainNavigation schoolLink="grand-hallet"
                      schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

  {school == "moxhe" && 
  <MainNavigation schoolLink="moxhe"
                  schoolLogo="/svg/Moxhe_blanc.svg" />}

      
  <img className='home-title-div' src="/svg/Banner-Hannut2.svg" />

  <br></br>

  <h4 className='news-home-title'>
  Notre école
  </h4>

  {school == "grand-hallet" &&
  <Carousel variant="dark" className='caroussel-div'>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/img/Grand-Hallet-photo_1.jpg"
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/img/Grand-Hallet-photo_2.jpg" 
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/img/Grand-Hallet-photo_3.jpg"
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>}

  {school == "moxhe" && 
   <Carousel variant="dark" className='caroussel-div'>
   <Carousel.Item>
     <img
       className="d-block w-100"
       src="/img/Moxhe-photo_1.jpg" 
       alt="First slide"
     />
   </Carousel.Item>
   <Carousel.Item>
     <img
       className="d-block w-100"
       src="/img/Moxhe-photo_2.jpg" 
       alt="Second slide"
     />
   </Carousel.Item>
   <Carousel.Item>
     <img
       className="d-block w-100"
       src="/img/Moxhe-photo_3.jpg"
       alt="Third slide"
     />
   </Carousel.Item>
 </Carousel>}

  <Card className='home-card-div'><elem style={{maxWidth: '50%'}}>
    <h1>Présentation de notre école.</h1>
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
      
  <h4 className='news-home-title'>
  Restez informé sur toute l'actualité de notre école ainsi que sur les divers événements organisés
  </h4>

      
  <News numberofnews={props.numberofnews}/>
  <br></br>
  <div className='news-link'>
    <Button href={`/${school}/actualites`}>Voir toutes les actualités</Button>
  </div>

  <br></br><br></br>
  

  {school == "grand-hallet" &&
  <div className='home-youtube-video-div'>
    <iframe className='home-youtube-video'
      src="https://www.youtube.com/embed/hFOp3RCDSu8"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="video"
    />
  </div>}

  {school == "moxhe" &&
  <div className='home-youtube-video-div'>
    <iframe className='home-youtube-video'
      src="https://www.youtube.com/embed/WEo590nrLnY" 
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title="video"
    />
  </div>}

  <br></br><br></br>


  {school == "grand-hallet" && 
  <Map lat={50.694356732800614} lng={5.038149998040227} />}

  {school == "moxhe" && 
  <Map lat={50.63151053045548} lng={5.081328142211933} />}

  <Footer />

</div>


    )
}

export default Home;