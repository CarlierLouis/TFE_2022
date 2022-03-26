import React from 'react';
import { Link } from 'react-router-dom';

import './Portal.css';

const Portal  = () => {
    return <div className='portal-main__div' >
      
    <Link to="/grand-hallet">
      <img className='img-redirect__GH' src="img/Grand-Hallet_couleur.png"></img></Link>
    <br></br><br></br>
    <Link to="/moxhe">
    <img className='img-redirect__Moxhe' src="img/Moxhe_couleur.png"></img>
    </Link>

  </div>
}

export default Portal;