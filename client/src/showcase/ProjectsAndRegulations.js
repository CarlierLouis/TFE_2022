import React from "react";

import { useParams } from "react-router-dom";
import MainNavigation from "../common/navigation/MainNavigation";

import './ProjectsAndRegulations.css';

const ProjectsAndRegulations = props => {
    const school = useParams().school;

    return (
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

export default ProjectsAndRegulations;