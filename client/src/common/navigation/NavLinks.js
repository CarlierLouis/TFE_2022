import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './NavLinks.css';

import { AuthContext } from '../context/auth-context';


const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className='nav-links'>
        <li>
            <NavLink to={"/" + props.schoolLink} exact>Accueil</NavLink>
        </li>
        
        <li>
            <NavLink to={"/"+ props.schoolLink + "/actualites"} >Actualités</NavLink>
        </li>

        <li>
            <NavLink to={"/"+ props.schoolLink + "/agenda"} >Agenda</NavLink>
        </li>

        <li>
            <NavLink to={"/"+ props.schoolLink + "/projets-et-reglements"} >Projets et règlements</NavLink>
        </li>

        {!auth.isLoggedIn && 
        <li>
            <NavLink to={"/"+ props.schoolLink + "/connexion/parent-eleve"}>Espace Parent/Elève</NavLink>
        </li>}

        {!auth.isLoggedIn && 
        <li>
            <NavLink to={"/"+ props.schoolLink + "/connexion/prof"}>Espace Prof</NavLink>
        </li>}
        

        {!auth.isLoggedIn &&
        <li>
            <NavLink to="/" exact>Nos écoles</NavLink>
        </li>}

        {auth.isLoggedIn && auth.role == "Admin" &&
        <li>
            <NavLink to={"/" + props.schoolLink + "/admin/utilisateurs"}>Utilisateurs</NavLink>
        </li>}

        {auth.isLoggedIn && (auth.role == "Default" || auth.role == "Admin") &&
        <li>
            <NavLink to={"/" + props.schoolLink + "/espace-prof"}>Espace prof</NavLink>
        </li>}

        {auth.isLoggedIn && auth.role == "Student" &&
        <li>
            <NavLink to={"/" + props.schoolLink + "/espace-personnel"} exact>Espace personnel</NavLink>
        </li>}

        {auth.isLoggedIn &&
        <li>
            <button onClick={auth.logout}><Link to={"/" + props.schoolLink} exact>Se déconnecter</Link></button>
        </li>}
    </ul>
};

export default NavLinks;