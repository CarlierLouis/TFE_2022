import React from 'react';

import './Footer.css';

const Footer = props => {
    return <footer className='showcase_footer'>
        <div className="footer-Hannut__logo" > 
        <img src="img/Hannut_logo_couleurs.png"
                     width={150} height={42} />
        </div>
        <div className="info-center">
        <a>{props.title}<br></br>
        {props.addresse},<br></br>
         4280 Hannut<br></br>
         </a>
        </div>
        <div className="rs-right">
            <a>0495/77.71.45<br></br>
         jacqueline.delathuy@hannut.be</a>
        </div>
    </footer>
}

export default Footer;