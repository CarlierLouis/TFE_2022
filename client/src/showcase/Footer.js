import React from 'react';

import { useParams } from 'react-router-dom';

import './Footer.css';

const Footer = props => {
    const school = useParams().school;

    return (
    <div>
    <footer className='showcase_footer'>
        <div className="footer-Hannut__logo" > 
        <img src="/img/Hannut_logo_couleurs.png"
                     width={150} height={42} />
        </div>
        <div className="info-center">

        {school == "grand-hallet" && 
        <a>Ecole Fondamentale de Grand-Hallet<br></br>
        Rue Mayeur J Debras 3A,<br></br>
         4280 Hannut<br></br>
         </a>}

        {school == "moxhe" && 
         <a>Ecole Fondamentale de Moxhe<br></br>
         Rue Tombeu 7,<br></br>
          4280 Hannut<br></br>
          </a>}

        </div>

        <div className="rs-right">
            <img src="/svg/phone.svg" width={"20px"}></img>&nbsp;<a>0495/77.71.45<br></br>
            <img src="/svg/mail.svg" width={"25px"}></img>&nbsp;jacqueline.delathuy@hannut.be</a>
        </div>
        
    </footer>
    <div className='legal-notice-div'>
        <a className='legal-notice'>Mentions légales</a>
    </div>

    <div className='end-footer-div'>
        <p>© 2022 - .... - Tous droits réservés</p>
    </div>
    </div>
    
    
    );
}

export default Footer;