import React, {useContext, useEffect, useState} from 'react';

import {useHistory, useParams} from 'react-router-dom';
import { AuthContext } from '../common/context/auth-context';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH, VALIDATOR_EMAIL} from '../common/util/validators';
import { useForm } from '../common/hooks/form-hooks';
import { useHttpClient } from '../common/hooks/http-hook';
import Input from '../common/FormElements/Input';
import Button from '../common/FormElements/Button';
import Card from '../common/UIElements/Card';
import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import MainNavigation from '../common/navigation/MainNavigation';
import PersonalData from './PersonalData';
import PersonnalCalendar from './PersonnalCalendar';
import Announcements from './Announcements';
import Documents from './Documents';

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

            <br></br>
            {section == "donnees-personnelles" &&
            <PersonalData />}

            {section == "horaires" &&
            <PersonnalCalendar />}
        </React.Fragment>
    ); 
}

export default PersonalSpace;