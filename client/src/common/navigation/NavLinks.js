import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';


const NavLinks = props => {
    return <ul className='nav-links'>
        <li>
            <NavLink to={"/" + props.schoolLink} exact>Acceuil</NavLink>
        </li>
        <li>
            <NavLink to={"/"+ props.actuLink +"/actu"} >Actualités</NavLink>
        </li>
        <li>
            <NavLink to="/inscription">Inscription</NavLink>
        </li>
        <li>
            <NavLink to="/connexion">Connexion</NavLink>
        </li>
    </ul>
};

export default NavLinks;