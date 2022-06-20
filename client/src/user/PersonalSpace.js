import React, { useContext } from 'react';

import { AuthContext } from '../common/context/auth-context';
import { useParams } from 'react-router-dom';
import MainNavigation from '../common/navigation/MainNavigation';

import './PersonalSpace.css';

const PersonalSpace = props => {
    const school = useParams().school;
    const section = useParams().section;
    const auth = useContext(AuthContext);

    if (auth.isLoggedIn && (auth.role == "Admin" || auth.role == "Default")){
        var usertypeSpace = "espace-prof"
    }
    if (auth.isLoggedIn && auth.role == "Student"){
        var usertypeSpace = "espace-personnel"
    }

    if(section == "annonces") {
        var AnnouncementsButton = {backgroundColor: "#628699", border: "#628699"}
    }
    if(section == "donnees-personnelles") {
        var PersonalDataButton = {backgroundColor: "#628699", border: "#628699"}
    }
    if(section == "horaires") {
        var TimetableButton = {backgroundColor: "#628699", border: "#628699"}
    }
    if(section == "documents") {
        var DocumentsButton = {backgroundColor: "#628699", border: "#628699"}
    }
    if(section == "sorties-scolaires") {
        var SchoolOutingsButton = {backgroundColor: "#628699", border: "#628699"}
    }
    

    return (
        <React.Fragment>
             {school == "grand-hallet" && 
                <MainNavigation schoolLink="grand-hallet"
                                schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="/svg/Moxhe_blanc.svg" />}
            
            <div className='personal-space-select'>
                <a style={AnnouncementsButton} 
                href={"/" + school + "/" + usertypeSpace + "/annonces"}>Annonces</a>
                <a style={PersonalDataButton} 
                href={"/" + school + "/" + usertypeSpace + "/donnees-personnelles"}>Données personnelles</a>
                <a style={TimetableButton} 
                href={"/" + school + "/" + usertypeSpace + "/horaires"}>Horaires</a>
                <a style={DocumentsButton} 
                href={"/" + school + "/" + usertypeSpace + "/documents"}>Documents</a>
                <a style={SchoolOutingsButton} 
                href={"/" + school + "/" + usertypeSpace + "/sorties-scolaires"}>Sorties scolaires</a>
            </div>
        </React.Fragment>
    ); 
}

export default PersonalSpace;