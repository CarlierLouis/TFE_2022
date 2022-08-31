import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import Input from '../../common/FormElements/Input';
import Button from '../../common/FormElements/Button';
import ErrorModal from '../../common/UIElements/ErrorModal';
import Modal from '../../common/UIElements/Modal';
import LoadingSpinner from '../../common/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH, VALIDATOR_EMAIL} from '../../common/util/validators';
import { useForm } from '../../common/hooks/form-hooks';
import { useHttpClient } from '../../common/hooks/http-hook';
import {AuthContext} from '../../common/context/auth-context';
import Card from '../../common/UIElements/Card';
import MainNavigation from '../../common/navigation/MainNavigation';

import './Users.css';

const UpdateUser = props => {
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    const usertype = useParams().usertype;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
	const history = useHistory();
	const school = useParams().school;
	const [showInfoRole, setShowInfoRole] = useState(false);

    const openInfoRoleHandler = () => {
		setShowInfoRole(true);
	};

	const closeInfoRoleHandler = () => {
		setShowInfoRole(false);
	};

	if (usertype == "profs") {
        var usertyperequest = "teachers";
    }
    if (usertype == "eleves") {
        var usertyperequest = "students";
    }
    if (usertype == "white-list-profs") {
        var usertyperequest = "trusted-teachers";
    }
    if (usertype == "white-list-eleves") {
        var usertyperequest = "trusted-students";
    }

    const [formState, inputHandler, setFormData] = useForm(
		{
        // common
		email: {
			value: '',
			isValid: false
		},
        // teachers 
		role: {
			value: '',
			isValid: false
		},
        // students && trusted students
        classyear: {
			value: '',
			isValid: false
		},
		//students
        address: {
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
					process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}/id/${userId}`,'GET', null,
                    {Authorization: 'Bearer ' + auth.token}
				);
				setLoadedUser(responseData.user);

				setFormData({
					email: {
					value: responseData.user.email,
					isValid: true
					},
					role: {
					value: responseData.user.role,
					isValid: true
					},
					classyear: {
					value: responseData.user.classyear,
					isValid: true
					},
					address: {
					value: responseData.user.address,
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
					email: formState.inputs.email.value,
                    role: formState.inputs.role.value,
                    classyear: formState.inputs.classyear.value,
					defaultclassyear: loadedUser.defaultclassyear,
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
			history.push('/' + school + '/admin/utilisateurs/' + usertype);
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
				<Button href={'/' + school + '/admin/utilisateurs/' + usertype}>
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
	var changed_email = {};

	if (loadedUser) {
		if (formState.inputs.email.value != loadedUser.email) {
			changed_email = changed_input
		}
		
		var changed_role = {};
		if (formState.inputs.role.value != loadedUser.role) {
			changed_role = changed_input
		}

		var changed_classyear = {};
		if (formState.inputs.classyear.value != loadedUser.classyear) {
			changed_classyear = changed_input
		}

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

		
		var changed_birdthdate = {};
		if (loadedUser.birdthdate != null && usertype == "eleves") {
			if (formState.inputs.birdthdate.value != loadedUser.birdthdate.toString().substring(0, 10)
				&& loadedUser.birdthdate != null) {
				changed_birdthdate = changed_input
			}
		}
	}
	

return (
	<React.Fragment>
		 {school == "grand-hallet" && 
		<MainNavigation schoolLink="grand-hallet"
						schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

		{school == "moxhe" && 
		<MainNavigation schoolLink="moxhe"
						schoolLogo="/svg/Moxhe_blanc.svg" />}

		<Modal className='info-role-modal-auth'
				show={showInfoRole}
				onCancel={closeInfoRoleHandler}
				footer={<Button onClick={closeInfoRoleHandler}>Fermer</Button>}>

				<a>Afin de modifier le rôle d'un compte prof et de faire passer celui-ci en "mode administrateur",
					veillez renseigner "Admin" dans le champ dédié au rôle.<br></br><br></br>
					Dans le cas contraire, si vous voulez supprimer l'accès administrateur d'un compte prof, veillez renseigner 
					"Default" dans ce même champ.
				</a>
			</Modal>

		<ErrorModal error={error} onClear={clearError} />
		<br></br>
		{!isLoading && loadedUser && 
		<form 
			className="user-form" 
			onSubmit={userUpdateSubmitHandler}>
			<h3 className='form-user-title'>Mettre à jour l'utilisateur: 
				<b>&nbsp;{loadedUser.name} {loadedUser.firstname}</b></h3>
			<div style={changed_email}>
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
			/>
			</div>
			{usertype == "profs" &&
			<div style={changed_role}>
			<Input
				id="role"
				element="input"
				type="text"
				label="Rôle"
				validators={[VALIDATOR_REQUIRE]}
				errorText="Veillez entrer un role valide."
				onInput={inputHandler}
				initialValue={loadedUser.role}
				initialValid={true}
			/>
			<img className="info-role" src="/svg/info.svg" onClick={openInfoRoleHandler}></img>
			</div>}

			{(usertype == "eleves" || usertype == "white-list-eleves") &&
			<div style={changed_classyear}>
			<Input
				id="classyear"
				element="input"
				type="text"
				label="Classe (ex: m1, p5, etc.)"
				validators={[VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH(5)]}
				errorText="Veillez entrer une classe valide."
				onInput={inputHandler}
				initialValue={loadedUser.classyear}
				initialValid={true}
			/></div>}

			{usertype == "eleves" &&
			<div>
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
		<div className="back-button">
		<Button href={'/' + school + '/admin/utilisateurs/' + usertype}>
			Retour
		</Button>
		</div>
		<br></br>
	</React.Fragment>
);
};

export default UpdateUser;