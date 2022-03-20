import React from 'react';
import { NavLink } from 'react-router-dom';

import '../common/navigation/NavLinks.css';


const NavLinksGH = props => {
    return <ul className='nav-links'>
        <li>
            <NavLink to="/grand-hallet" exact>Acceuil</NavLink>
        </li>
        <li>
            <NavLink to="/grand-hallet/actu" >Actualités</NavLink>
        </li>
        <li>
            <NavLink to="/inscription">Inscription</NavLink>
        </li>
        <li>
            <NavLink to="/connexion">Connexion</NavLink>
        </li>
    </ul>
};

export default NavLinksGH;