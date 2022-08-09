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

      
  <img className='home-title-banner' src="/svg/Banner-Hannut2.svg" />

  <h4 className='home-title'>
  Restez informé sur toute l'actualité de notre école ainsi que sur les divers événements organisés
  </h4>

      
  <News numberofnews={props.numberofnews}/>
  <br></br>
  <div className='news-link'>
    <Button href={`/${school}/actualites`}>Voir toutes les actualités</Button>
  </div>

  <br></br><br></br>
  
  <div>

  <h4 className='home-title our-school'>
  Notre école
  </h4>

  {school == "grand-hallet" &&
  <Carousel variant="dark" className='caroussel-div'>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="/img/Grand-Hallet-photo_1.jpg"
        alt="First slide"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="/img/Grand-Hallet-photo_2.jpg" 
        alt="Second slide"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="/img/Grand-Hallet-photo_3.jpg"
        alt="Third slide"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="/img/Grand-Hallet-photo_4.jpg"
        alt="Third slide"
      />
    </Carousel.Item>
    <Carousel.Item interval={2000}>
      <img
        className="d-block w-100"
        src="/img/Grand-Hallet-photo_5.jpg"
        alt="Third slide"
      />
    </Carousel.Item>
  </Carousel>}

  {school == "moxhe" && 
   <Carousel variant="dark" className='caroussel-div'>
   <Carousel.Item interval={2000}>
     <img
       className="d-block w-100"
       src="/img/Moxhe-photo_1.jpg" 
       alt="First slide"
     />
   </Carousel.Item>
   <Carousel.Item interval={2000}>
     <img
       className="d-block w-100"
       src="/img/Moxhe-photo_2.jpg" 
       alt="Second slide"
     />
   </Carousel.Item>
   <Carousel.Item interval={2000}>
     <img
       className="d-block w-100"
       src="/img/Moxhe-photo_3.jpg"
       alt="Third slide"
     />
   </Carousel.Item>
   <Carousel.Item interval={2000}>
     <img
       className="d-block w-100"
       src="/img/Moxhe-photo_4.jpg"
       alt="Third slide"
     />
   </Carousel.Item>
   <Carousel.Item interval={2000}>
     <img
       className="d-block w-100"
       src="/img/Moxhe-photo_5.jpg"
       alt="Third slide"
     />
   </Carousel.Item>
 </Carousel>}


  <Card className='home-card-div'>
    
    <div>
    <img className='h2-home' src="/svg/h2-v1.svg" />
    </div>

    {school == "moxhe" &&
    <elem style={{maxWidth: '50%'}}>
      Dans un cadre rénové et verdoyant, les enfants seront accueillis par une
  équipe attentive à l’évolution de chaque enfant. 
  Nous participons régulièrement à des activités sportives, culturelles,
  économiques et sociales.<br></br><br></br>
  Dans le cadre d’un projet sur l’alimentation « saine », différentes
  activités verront le jour au bénéfice de vos enfants.<br></br><br></br>
  L’espace aux abords de l’établissement scolaire et la motivation de
  l’équipe pédagogique permettront aux élèves de mettre en place un
  petit projet axé sur la pratique du sport et de ses bienfaits sur notre
  bien-être!<br></br><br></br>


  La langue néerlandaise est dispensée dès la 1

  ère primaire à raison d’une

  période par semaine. De plus, dès la 1

  ère maternelle et ce jusqu’à la 3
  ème
  ,
  les enfants bénéficieront de deux périodes de psychomotricité par
  semaine.<br></br><br></br>
  L’organisation d’une école de devoirs est proposée chaque jour à vos
  enfants. Le mode de fonctionnement de l’école est adapté et axé sur les
  enfants qui présentent des difficultés d’apprentissage.<br></br><br></br>
  Une garderie animée est organisée chaque jour dès 7heure du matin et
  jusque 18heure. Le mercredi après-midi, la garderie est décentralisée à
  Hannut centre (Saline).

    </elem>}

    {school == "grand-hallet" &&
    <elem style={{maxWidth: '50%'}}>
     Les enfants seront accueillis par une équipe
dynamique et soudée dans une nouvelle
implantation. La continuité du parcours
scolaire de chaque élève sera mise en exergue
grâce aux nombreux échanges et concertations.<br></br><br></br>
Le mode de fonctionnement de l’école est adapté et axé sur les enfants
qui présentent des difficultés d’apprentissage.<br></br><br></br>
Dans le cadre d’un projet sur l’alimentation « saine », différentes
activités verront le jour au bénéfice de vos enfants.<br></br><br></br>
L’espace aux abords de l’établissement scolaire et la motivation de
l’équipe pédagogique permettront aux élèves de mettre en place un
petit projet axé sur la pratique du sport et de ses bienfaits sur notre
bien-être!<br></br><br></br>
La langue néerlandaise est dispensée dès la 1

ère primaire à raison d’une

période par semaine. De plus, dès la 1

ère maternelle et ce jusqu’à la 3
ème
,
les enfants bénéficieront de deux périodes de psychomotricité par
semaine.<br></br><br></br>
L’organisation d’une école de devoirs est proposée chaque jour à vos
enfants.<br></br><br></br>

Une garderie animée est organisée chaque jour dès 7heure du matin et
jusque 18heure. Le mercredi après-midi la garderie est décentralisée à
Hannut centre (Saline).

    </elem>}
    
  
  </Card>

  </div>


  <br></br>

  

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


  
  <div className='home-team-objectives'>
    <h4>Notre équipe éducative traduit dans ses pratiques et par des actions concrètes les
  objectifs d’éducation que les enfants qui lui sont confiés méritent au quotidien.</h4>
  </div>

 {school == "grand-hallet" && 
<img className='home-foot-image' src="/img/Grand-Hallet-photo_6.jpg"/>}

{school == "moxhe" && 
<img className='home-foot-image' src="/img/Moxhe-photo_6.jpg"/>}


  <br></br><br></br><br></br>


  <h2 class="home-contact-title">Informations et contact</h2>
  


  {school == "grand-hallet" && 
  <Map lat={50.694356732800614} lng={5.038149998040227} />}

  {school == "moxhe" && 
  <Map lat={50.63151053045548} lng={5.081328142211933} />}

  <Footer />

</div>


    )
}

export default Home;