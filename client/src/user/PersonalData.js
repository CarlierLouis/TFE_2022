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

import './PersonalData.css';

const PersonalData = props => {
    const school = useParams().school;
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
	const history = useHistory();
    const userId = auth.userId;
    const usertype = auth.role;

    if (auth.isLoggedIn && (auth.role == "Admin" || auth.role == "Default")){
        var usertypeSpace = "espace-prof"
    }
    if (auth.isLoggedIn && auth.role == "Student"){
        var usertypeSpace = "espace-personnel"
    }

    if (auth.role == "Default" || auth.role == "Admin") {
        var usertyperequest = "teachers";
    }
    if (auth.role == "Student") {
        var usertyperequest = "students";
    }

    const [formState, inputHandler, setFormData] = useForm(
		{
        address: {
			value: '',
			isValid: false
		},
        defaultclassyear: {
            value: '',
            isValid: false
        },
        phonenumber: {
			value: '',
			isValid: false
		},
        birdthdate: {
			value: '',
			isValid: false
		}
		},
		false
	);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/id/${userId}`
				);
				setLoadedUser(responseData.user);

				setFormData({
					address: {
					value: responseData.user.address,
					isValid: true
					},
                    defaultclassyear:{
                    value: responseData.user.defaultclassyear,
                    isValid: true
                    },
                    phonenumber: {
                    value: responseData.user.phonenumber,
                    isValid: true
                    },
                    birdthdate: {
                    value: responseData.user.birdthdate,
                    isValid: true
                    }
				},true);
			}
			catch(err) {}
		};
		fetchUser();
	}, 
	[sendRequest, userId, setFormData]);

    const userUpdateSubmitHandler = async event => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/${userId}`,
				'PATCH',
				JSON.stringify({
					email: loadedUser.email,
                    role: loadedUser.role,
                    classyear: loadedUser.classyear,
                    defaultclassyear: formState.inputs.defaultclassyear.value,
                    address: formState.inputs.address.value,
                    phonenumber: formState.inputs.phonenumber.value,
                    birdthdate: formState.inputs.birdthdate.value,
					password: loadedUser.password
				}),
				{
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token
				}
			);
			history.push('/' + school + '/' + usertypeSpace + '/donnees-personnelles');
            window.location.reload(true)
		}
		catch(err) {}
	};

    if(isLoading) {
		return (
		<div className="center">
			<LoadingSpinner asOverlay/>
		</div>
		);
	}

	if (!loadedUser && !error) {
		return (
		<div className="center">
			<Card>
			<h2>Aucun utilisateur trouvé !</h2>

			<div className="back-button">
				<Button href={'/' + school + '/' + usertypeSpace + '/donnees-personnelles'}>
                    Retour
                </Button>
		    </div>
			</Card>
		</div>
		);
	}

    const changed_input = {
		border: "solid #F5B7B1",
		borderRadius: "4px",
		padding: "1%",
		margin: "1%"
	}

	if (loadedUser) {
		var changed_address = {};
		if (formState.inputs.address.value != loadedUser.address 
			&& loadedUser.address != null) {
			changed_address = changed_input
		}

		var changed_phonenumber = {};
		if (formState.inputs.phonenumber.value != loadedUser.phonenumber
			&& loadedUser.phonenumber != null) {
			changed_phonenumber = changed_input
		}

        var changed_defaultclassyear = {};
		if (formState.inputs.defaultclassyear.value != loadedUser.defaultclassyear
			&& loadedUser.defaultclassyear != null) {
                changed_defaultclassyear = changed_input
		}

		
		var changed_birdthdate = {};
		if (loadedUser.birdthdate != null && auth.role == "Student") {
			if (formState.inputs.birdthdate.value != loadedUser.birdthdate.toString().substring(0, 10)
				&& loadedUser.birdthdate != null) {
				changed_birdthdate = changed_input
			}
		}
	}

    return (
        <React.Fragment>

            <ErrorModal error={error} onClear={clearError} />
            <br></br>
            
            <div>
                {!isLoading && loadedUser && 
                <form 
                    className="user-form" 
                    onSubmit={userUpdateSubmitHandler}>
                    <h3 className='form-user-title'>Données personnelles</h3>

                    <div style={{opacity: "0.7"}} >
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Nom"
                        validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL()]}
                        errorText="Veillez entrer une addresse email valide."
                        onInput={inputHandler}
                        initialValue={loadedUser.name}
                        initialValid={true}
                        disabled={true}
                    />
                    </div>

                    <div style={{opacity: "0.7"}} >
                    <Input 
                        id="firstname"
                        element="input"
                        type="text"
                        label="Prénom"
                        validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL()]}
                        errorText="Veillez entrer une addresse email valide."
                        onInput={inputHandler}
                        initialValue={loadedUser.firstname}
                        initialValid={true}
                        disabled={true}
                    />
                    </div>

                    <div style={{opacity: "0.7"}} >
                    <Input
                        id="email"
                        element="input"
                        type="text"
                        label="Email"
                        validators={[VALIDATOR_REQUIRE, VALIDATOR_EMAIL()]}
                        errorText="Veillez entrer une addresse email valide."
                        onInput={inputHandler}
                        initialValue={loadedUser.email}
                        initialValid={true}
                        disabled={true}
                    />
                    </div>

                    {(auth.role == "Admin" || auth.role == "Default") &&
                    <div style={changed_defaultclassyear}>
                    <Input
                        id="defaultclassyear"
                        element="input"
                        type="text"
                        label="Classe principale (ex: m1, p5, etc.)"
                        validators={[VALIDATOR_REQUIRE]}
                        errorText="Veillez entrer une classe valide."
                        onInput={inputHandler}
                        initialValue={loadedUser.defaultclassyear}
                        initialValid={true}
                    />
                    </div>}

                    {auth.role == "Student" &&
                    <div>
                    <div style={{opacity: "0.7"}} >
                    <Input
                        id="classyear"
                        element="input"
                        type="text"
                        label="Classe"
                        validators={[VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH(5)]}
                        errorText="Veillez entrer une classe valide."
                        onInput={inputHandler}
                        initialValue={loadedUser.classyear}
                        initialValid={true}
                        disabled={true}
                    /></div>

                    <div style={changed_address}>
                    <Input
                    id="address"
                    element="input"
                    type="text"
                    label="Adresse (max 30 cara.)"
                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH(30)]}
                    errorText="Veillez entrer une adresse valide."
                    onInput={inputHandler}
                    initialValue={loadedUser.address}
                    initialValid={true}
                    /></div>
                    
                    <div style={changed_phonenumber}>
                    <Input
                    id="phonenumber"
                    element="input"
                    type="text"
                    label="Gsm"
                    validators={[VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH(15)]}
                    errorText="Veillez entrer un numéro valide."
                    onInput={inputHandler}
                    initialValue={loadedUser.phonenumber}
                    initialValid={true}
                    /></div>
                    
                    {loadedUser.birdthdate != null &&
                    <div style={changed_birdthdate}>
                    <Input
                    id="birdthdate"
                    element="input"
                    type="date"
                    label="Date de naissance"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Veillez entrer une date valide."
                    onInput={inputHandler}
                    initialValue={loadedUser.birdthdate.toString().substring(0, 10)}
                    initialValid={true}
                    /></div>}

                    {loadedUser.birdthdate == null &&
                    <div style={changed_birdthdate}>
                    <Input
                    id="birdthdate"
                    element="input"
                    type="date"
                    label="Date de naissance"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Veillez entrer une date valide."
                    onInput={inputHandler}
                    initialValue={loadedUser.birdthdate}
                    initialValid={true}
                    /></div>}

                    </div>}


                    <Button type="submit" disabled={!formState.isValid}>
                        Mettre à jour
                    </Button>
                </form>}
                 
                <br></br>
            </div>
        </React.Fragment>
    ); 
}

export default PersonalData;