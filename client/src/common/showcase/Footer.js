import React from 'react';

import './Footer.css';

const Footer = props => {
    return <footer className='showcase_footer'>
        <div className="footer-Hannut__logo" > 
        <img src="img/Hannut_logo_couleurs.png"
                     width={150} height={42} />
        </div>
        <div className="info-center">
        <a>Ecole Fondamentale de Grand-Hallet</a>
        </div>
        <div className="rs-right">
            <a>Info RS,ect.</a>
        </div>
    </footer>
}

export default Footer;