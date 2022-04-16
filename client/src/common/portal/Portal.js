import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';

import './Portal.css';

const Portal  = () => {
    return (
  <CardGroup className="portal">
  <div className='portal-img-div'><img className='portal-img' src="img/portail-title.png"></img></div>
    <Card className="portal-GH border-0" style={{ backgroundColor: 'rgb(31, 30, 30)'}}>
      <Link to="/grand-hallet">
    <div className="animated-portal-div">
      <span>
        <Card.Img variant="top" src="img/Grand-Hallet-photo_1.jpg" />
        <div>
        <img className='txt-GH' src="img/Grand-Hallet_blanc.png" ></img>
        </div>
      </span>
    </div>
    </Link>
      
    </Card>

    <Card className="portal-Moxhe border-0" style={{ backgroundColor: 'rgb(31, 30, 30)'}} >
      <Link to="/moxhe">
    <div className="animated-portal-div">
      <span>
      <Card.Img variant="top" src="img/Moxhe-photo_1.jpg" />
        <div>
          <img className='txt-Moxhe' src="img/Moxhe_blanc.png"></img>
      </div>
      </span>
    </div>
    </Link>

    </Card>
  </CardGroup>



  )
}

export default Portal;