import React, {useContext, use} from 'react';

import {useHistory, useParams} from 'react-router-dom';
import Input from '../../common/FormElements/Input';
import Button from '../../common/FormElements/Button';
import ErrorModal from '../../common/UIElements/ErrorModal';
import LoadingSpinner from '../../common/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH, VALIDATOR_EMAIL} from '../../common/util/validators';
import { useForm } from '../../common/hooks/form-hooks';
import { useHttpClient } from '../../common/hooks/http-hook';
import {AuthContext} from '../../common/context/auth-context';
import MainNavigation from '../../common/navigation/MainNavigation';

import './Users.css';

const AddUser = props => {
	const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const history = useHistory();
    const usertype = useParams().usertype;
	const school = useParams().school;

    if (usertype == "white-list-profs") {
        var usertyperequest = "trusted-teachers";
    }
    if (usertype == "white-list-eleves") {
        var usertyperequest = "trusted-students";
    }

    const [formState, inputHandler] = useForm(
		{
			email: {
				value: '',
				isValid: false
			},
			name: {
				value: '',
				isValid: false
			},
			firstname: {
				value: '',
				isValid: false
			},
			// trusted students
			classyear: {
				value: '',
				isValid: true
			}
		},
		false
	);
	

    const userSubmitHandler = async event => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/${usertyperequest}`,
				'POST',
				JSON.stringify({
					email: formState.inputs.email.value,
					name: formState.inputs.name.value,
					firstname: formState.inputs.firstname.value,
					school: school,
					classyear: formState.inputs.classyear.value
				}),
				{'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token}
			);
			history.push('/' + school + '/admin/utilisateurs/' + usertype);
		}
		catch(err) {}
	};
    

    return (
		<React.Fragment>
			{school == "grand-hallet" && 
			<MainNavigation schoolLink="grand-hallet"
							schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

			{school == "moxhe" && 
			<MainNavigation schoolLink="moxhe"
							schoolLogo="/svg/Moxhe_blanc.svg" />}

			<ErrorModal error={error} onClear={clearError} />
			<br></br>
			<form className="user-form" onSubmit={userSubmitHandler}>
                {usertype == "white-list-eleves" &&
				<h3 className='form-user-title'>Ajouter un nouvel élève de confiance</h3>}
                
                {usertype == "white-list-profs" &&
				<h3 className='form-user-title'>Ajouter un nouveau professeur de confiance</h3>}

				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id="email"
					element="input"
					type="text"
					label="Email"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
					errorText="Veillez entrer un email valide."
					onInput={inputHandler}
				/>

                <Input
					id="name"
					element="input"
					type="text"
					label="Nom"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Veillez entrer un nom valide."
					onInput={inputHandler}
				/>

                <Input
					id="firstname"
					element="input"
					type="text"
					label="Prénom"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Veillez entrer un prénom valide."
					onInput={inputHandler}
				/>

                {usertype == "white-list-eleves" &&
                <Input
					id="classyear"
					element="input"
					type="text"
					label="Classe (ex: m1, p5, etc.)"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Veillez entrer une classe valide."
					onInput={inputHandler}
				/>}
					
				<Button type="submit" disabled={!formState.isValid}>
					Ajouter
				</Button>
			</form>

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

export default AddUser;