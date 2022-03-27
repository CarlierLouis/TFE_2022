import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';


const NavLinks = props => {
    return <ul className='nav-links'>
        <li>
            <NavLink to={"/" + props.schoolLink} exact>Accueil</NavLink>
        </li>
        <li>
            <NavLink to={"/"+ props.actuLink +"/actu"} >Actualités</NavLink>
        </li>
        <li>
            <NavLink to="/connexion">Connexion</NavLink>
        </li>
        <li>
            <NavLink to="/" exact>Nos écoles</NavLink>
        </li>
    </ul>
};

export default NavLinks;