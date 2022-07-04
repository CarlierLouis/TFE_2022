import React from "react";

import MainNavigation from '../common/navigation/MainNavigation';
import { useParams } from "react-router-dom";

import './GlobalCalendar.css';

const GlobalCalendar = props => {
    const school = useParams().school;

    return(
        <React.Fragment>
            {school == "grand-hallet" && 
                <MainNavigation schoolLink="grand-hallet"
                                schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="/svg/Moxhe_blanc.svg" />}

        </React.Fragment>
    )
}

export default GlobalCalendar;