import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css'
import { propTypes } from 'google-map-react';


const MainNavigation = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    
    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };
    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className='main-navigation__drawer-nav'>
                    <NavLinks schoolLink={props.schoolLink} actuLink={props.actuLink} />
                </nav>
            </SideDrawer>
            
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1>
                    <Link to={"/" + props.schoolLink}><img className='main-navigation__logo' src={props.schoolLogo}
                      /></Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks schoolLink={props.schoolLink} actuLink={props.actuLink}  />
                </nav>
            </MainHeader>
    </React.Fragment>
    );
};

export default MainNavigation;