import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css'

const NavLinks = props => {
    return <ul className='nav-links'>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/1">11111</NavLink>
        </li>
        <li>
            <NavLink to="/2">211111</NavLink>
        </li>
        <li>
            <NavLink to="/3">311111</NavLink>
        </li>
    </ul>
};

export default NavLinks;