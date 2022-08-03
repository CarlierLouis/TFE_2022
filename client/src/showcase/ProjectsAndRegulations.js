import React from "react";

import { useParams } from "react-router-dom";
import MainNavigation from "../common/navigation/MainNavigation";
import Button from "../common/FormElements/Button";

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

            <div>

            <div className="project-main-div">

                <h4 className="project-main-title">Projets</h4>

                <div className="project-div">

                    <br></br>

                    <h4>Projet d'établissement de Hannut II</h4>

                    <p className="project-description"></p>

                    <a href="/doc/projet-d-etablissement.pdf" target="_blank">
                    <Button>
                        <img className="project-pdf-img" src="/svg/pdf.svg" />
                        &nbsp;&nbsp;Document
                    </Button>
                    </a>

                    <br></br><br></br><hr></hr>

                    <h4 className="project-title">Projet pédagogique de Hannut II</h4>

                    <p className="project-description"></p>

                    <a href="/doc/projet-pedagogique.pdf" target="_blank">
                    <Button>
                        <img className="project-pdf-img" src="/svg/pdf.svg" />
                        &nbsp;&nbsp;Document
                    </Button>
                    </a>

                    <br></br><br></br><hr></hr>

                    <h4 className="project-title">Projet éducatif et pédagogique du CECP</h4>

                    <p className="project-description"></p>

                    <a href="/doc/projets-educatif-et-pedagogique-du-cecp.pdf" target="_blank">
                    <Button>
                        <img className="project-pdf-img" src="/svg/pdf.svg" />
                        &nbsp;&nbsp;Document
                    </Button>
                    </a>

                    <br></br><br></br>

                </div>

            </div>


            <div className="project-main-div">

                <h4 className="project-main-title">Règlements</h4>

                <div className="project-div">

                    <br></br>

                    <h4>Règlement d'ordre intérieur</h4>

                    <p className="project-description"></p>

                    <a href="/doc/" target="_blank">
                    <Button>
                        <img className="project-pdf-img" src="/svg/pdf.svg" />
                        &nbsp;&nbsp;Document
                    </Button>
                    </a>

                    <br></br><br></br><hr></hr>

                    <h4 className="project-title">Règlement des études</h4>

                    <p className="project-description"></p>

                    <a href="/doc/" target="_blank">
                    <Button>
                        <img className="project-pdf-img" src="/svg/pdf.svg" />
                        &nbsp;&nbsp;Document
                    </Button>
                    </a>

                    <br></br><br></br><hr></hr>

                    <h4 className="project-title">Fréquentation scolaire</h4>

                    <p className="project-description"></p>

                    <a href="/doc/" target="_blank">
                    <Button>
                        <img className="project-pdf-img" src="/svg/pdf.svg" />
                        &nbsp;&nbsp;Document
                    </Button>
                    </a>

                    <br></br><br></br>

                </div>

            </div>


            </div>

        </React.Fragment>
    )
}

export default ProjectsAndRegulations;