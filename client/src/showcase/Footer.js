import React from 'react';

import './Footer.css';

const Footer = props => {
    return (
    <div>
    <footer className='showcase_footer'>
        <div className="footer-Hannut__logo" > 
        <img src="/img/Hannut_logo_couleurs.png"
                     width={150} height={42} />
        </div>
        <div className="info-center">
        <a>{props.title}<br></br>
        {props.addresse},<br></br>
         4280 Hannut<br></br>
         </a>
        </div>
        <div className="rs-right">
            <img src="/svg/phone.svg" width={"5%"}></img>&nbsp;<a>0495/77.71.45<br></br>
            <img src="/svg/mail.svg" width={"5%"}></img>&nbsp;jacqueline.delathuy@hannut.be</a>
        </div>
        
    </footer>
    <div className='legal-notice-div'>
        <a className='legal-notice'>Mentions légales</a>
    </div>

    <div className='end-footer-div'>
        <p>© 2022 - .... - Tous droits réservé</p>
    </div>
    </div>
    
    
    );
}

export default Footer;