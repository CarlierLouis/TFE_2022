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
    const [selected, setSelected] = useState();
    const [loadedUser, setLoadedUser] = useState();
    const usertype = auth.role;
    const userId = auth.userId;
    const {sendRequest} = useHttpClient();


    if (auth.isLoggedIn && (auth.role == "Admin" || auth.role == "Default")){
        var usertypeSpace = "espace-prof"
    }
    if (auth.isLoggedIn && auth.role == "Student"){
        var usertypeSpace = "espace-personnel"
    }

    if (usertype == "Default" || usertype == "Admin") {
        var usertyperequest = "teachers";
    }
    if (usertype == "Student") {
        var usertyperequest = "students";
    }

    useEffect(() => {
		const fetchUser = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/id/${userId}`
				);
				setLoadedUser(responseData.user);
			}
			catch(err) {}
		};
		fetchUser();
    }, 
	[sendRequest, userId]);



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

    const onChangedSelect = () => {
        setSelected(document.getElementById('option-select').value);
    };


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

            {(auth.role == "Default" || auth.role == "Admin") 
            && section == "horaires" && !selected &&
            <div className='center'>
                <h4>Veillez sélectionner une classe</h4>
                <select name="option" id="option-select" onChange={onChangedSelect}>
                    <option value="">--Classes--</option>
                    <option value="m0">m0</option>
                    <option value="m1">m1</option>
                    <option value="m2">m2</option>
                    <option value="m3">m3</option>
                    <option value="p1">p1</option>
                    <option value="p2">p2</option>
                    <option value="p3">p3</option>
                    <option value="p4">p4</option>
                    <option value="p5">p5</option>
                    <option value="p6">p6</option>
                    </select>
                </div>}

            {section == "horaires" && selected &&
            <PersonnalCalendar classyear={selected} />}

            {section == "horaires" && auth.role == "Student" && loadedUser &&
            <PersonnalCalendar class={loadedUser.classyear} />}
        </React.Fragment>
    ); 
}

export default PersonalSpace;