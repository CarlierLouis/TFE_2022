import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './Portal.css';

const Portal  = () => {
    return (
    <div className='portal-main__div'>
        <Card className='portal-photo__GH' style={{backgroundColor: '#ECF0F7'}} >
            <Card.Img variant="top" src="img/Grand-Hallet-photo_1.jpg" />
            <Link to="/grand-hallet">
              <img className='txt-GH' src="img/Grand-Hallet_couleur.png" ></img>
            </Link>
        </Card>


      <Card className='portal-photo__Moxhe' style={{backgroundColor: '#ECF0F7'}} >
      <Link to="/moxhe">
            <img className='txt-Moxhe' src="img/Moxhe_couleur.png"></img>
      </Link>
      <Card.Img variant="top" src="img/Moxhe-photo_1.jpg" />
      </Card>
</div>
  )
}

export default Portal;