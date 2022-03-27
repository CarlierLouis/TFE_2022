import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';

import './Portal.css';

const Portal  = () => {
    return (
<CardGroup className="portal">
  <Card className="portal-GH" >
    <Card.Img variant="top" src="img/Grand-Hallet-photo_1.jpg" />
    <Link to="/grand-hallet">
      <img className='txt-GH' src="img/Grand-Hallet_couleur.png" ></img>
    </Link>
  </Card>
  <Card className="portal-Moxhe">
    <Card.Img variant="top" src="img/Moxhe-photo_1.jpg" />
  <Link to="/moxhe">
        <img className='txt-Moxhe' src="img/Moxhe_couleur.png"></img>
    </Link>
  </Card>
</CardGroup>
  )
}

export default Portal;