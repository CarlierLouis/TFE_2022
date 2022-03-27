import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';

import './Portal.css';

const Portal  = () => {
    return (
<CardGroup className="portal">
  <Card className="portal-GH" style={{ backgroundColor: 'rgb(31, 30, 30)'}} >
    <Card.Img variant="top" src="img/Grand-Hallet-photo_1.jpg" />
    <Link to="/grand-hallet">
      <img className='txt-GH' src="img/Grand-Hallet_blanc.png" ></img>
    </Link>
  </Card>
  <Card className="portal-Moxhe" style={{ backgroundColor: 'rgb(31, 30, 30)'}} >
    <Card.Img variant="top" src="img/Moxhe-photo_1.jpg" />
      <Link to="/moxhe">
        <img className='txt-Moxhe' src="img/Moxhe_blanc.png"></img>
    </Link>
  </Card>
</CardGroup>
  )
}

export default Portal;