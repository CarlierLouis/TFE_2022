import React from 'react';
import { NavLink } from 'react-router-dom';

import '../common/navigation/NavLinks.css';


const NavLinksMoxhe = props => {
    return <ul className='nav-links'>
        <li>
            <NavLink to="/moxhe" exact>Acceuil</NavLink>
        </li>
        <li>
            <NavLink to="/moxhe/actu" >Actualités</NavLink>
        </li>
        <li>
            <NavLink to="/inscription">Inscription</NavLink>
        </li>
        <li>
            <NavLink to="/connexion">Connexion</NavLink>
        </li>
    </ul>
};

export default NavLinksMoxhe;