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

import './Users.css';

const AddUser = props => {
	const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const history = useHistory();
    const usertype = useParams().usertype;

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
				process.env.REACT_APP_BACKEND_URL + `/api/${usertype}`,
				'POST',
				JSON.stringify({
					email: formState.inputs.email.value,
					name: formState.inputs.name.value,
					firstname: formState.inputs.firstname.value,
					school: props.school,
					classyear: formState.inputs.classyear.value
				}),
				{'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token}
			);
			history.push('/' + props.school + '/admin/utilisateurs/' + usertype);
		}
		catch(err) {}
	};
    

    return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<br></br>
			<form className="user-form" onSubmit={userSubmitHandler}>
                {usertype == "trusted-students" &&
				<h3 className='form-user-title'>Ajouter un nouvel élève de confiance</h3>}
                
                {usertype == "trusted-teachers" &&
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

                {usertype == "trusted-students" &&
                <Input
					id="classyear"
					element="input"
					type="text"
					label="Classe"
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
				<Button href={'/' + props.school + '/admin/utilisateurs/' + usertype}>
					Retour
				</Button>
			</div>

			<br></br>
		</React.Fragment>
	);
};

export default AddUser;