import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from '../common/navigation/MainHeader';
import NavLinksMoxhe from './NavLinksMoxhe';
import SideDrawer from '../common/navigation/SideDrawer';
import Backdrop from '../common/UIElements/Backdrop';
import '../common/navigation/MainNavigation.css';


const MainNavigationMoxhe = props => {
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
                    <NavLinksMoxhe />
                </nav>
            </SideDrawer>
            
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1>
                    <Link to="/"><img className='main-navigation__logo' src="Hannut_logo_blanc.png"
                     width={150} height={42} /></Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinksMoxhe />
                </nav>
            </MainHeader>
    </React.Fragment>
    );
};

export default MainNavigationMoxhe;