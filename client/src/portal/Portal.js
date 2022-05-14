import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';

import './Portal.css';

const Portal  = () => {
    return (
  <CardGroup className="portal">
  <div className='portal-img-div'><img className='portal-img' src="img/portail-title.png"></img></div>

    <Card className="portal-GH border-0" style={{ backgroundColor: 'rgb(31, 30, 30)'}}>
    <h1 className='school-title'>École de Grand-Hallet</h1>
      <Link to="/grand-hallet">
    <div className="animated-portal-div">
      <span>
        <Card.Img variant="top" src="img/Grand-Hallet-photo_1.jpg" />
        
      </span>
    </div>
    </Link>
      
    </Card>

    <Card className="portal-Moxhe border-0" style={{ backgroundColor: 'rgb(31, 30, 30)'}} >
    <h1 className='school-title'>École de Moxhe</h1>
      <Link to="/moxhe">
    <div className="animated-portal-div">
      <span>
      <Card.Img variant="top" src="img/Moxhe-photo_1.jpg" />
        
      </span>
    </div>
    </Link>

    </Card>
  </CardGroup>



  )
}

export default Portal;