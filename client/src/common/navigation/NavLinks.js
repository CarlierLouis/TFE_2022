import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

import { AuthContext } from '../context/auth-context';


const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className='nav-links'>
        <li>
            <NavLink to={"/" + props.schoolLink} exact>Accueil</NavLink>
        </li>
        
        <li>
            <NavLink to={"/"+ props.schoolLink +"/actu"} >Actualités</NavLink>
        </li>

        {!auth.isLoggedIn && 
        <li>
            <NavLink to={"/"+ props.schoolLink + "/login/parent-eleve"}>Espace Parent/Elève</NavLink>
        </li>}

        {!auth.isLoggedIn && 
        <li>
            <NavLink to={"/"+ props.schoolLink + "/login/prof"}>Espace Prof</NavLink>
        </li>}

        {!auth.isLoggedIn &&
        <li>
            <NavLink to="/" exact>Nos écoles</NavLink>
        </li>}

        {auth.isLoggedIn && auth.role == "Admin" &&
        <li>
            <NavLink to={"/" + props.schoolLink + "/admin"} exact>Admin</NavLink>
        </li>}

        {auth.isLoggedIn && auth.role == "Default" &&
        <li>
            <NavLink to={"/" + props.schoolLink + "/espace-prof"} exact>Espace personnel</NavLink>
        </li>}

        {auth.isLoggedIn && auth.role == "Student" &&
        <li>
            <NavLink to={"/" + props.schoolLink + "/espace-eleve"} exact>Espace personnel</NavLink>
        </li>}

        {auth.isLoggedIn &&
        <li>
            <button onClick={auth.logout}>Se déconnecter</button>
        </li>}
    </ul>
};

export default NavLinks;