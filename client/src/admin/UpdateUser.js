import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import Input from '../common/FormElements/Input';
import Button from '../common/FormElements/Button';
import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../common/util/validators';
import { useForm } from '../common/hooks/form-hooks';
import { useHttpClient } from '../common/hooks/http-hook';
import {AuthContext} from '../common/context/auth-context';
import Card from '../common/UIElements/Card';

import './Users.css';

const UpdateUser = props => {
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    const usertype = useParams().usertype;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
	const history = useHistory();

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
        // students
        classyear: {
			value: '',
			isValid: false
		},
        address: {
			value: null,
			isValid: false
		},
        phonenumber: {
			value: null,
			isValid: false
		},
        birdthdate: {
			value: null,
			isValid: false
		}
		},
		false
	);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/${usertype}/id/${userId}`
				);
				setLoadedUser(responseData.user);

				setFormData({
					email: {
					value: responseData.news.email,
					isValid: true
					},
					role: {
					value: responseData.news.role,
					isValid: true
					},
					classyear: {
					value: responseData.news.classyear,
					isValid: true
					},
					address: {
					value: responseData.news.address,
					isValid: true
					},
                    phonenumber: {
                    value: responseData.news.phonenumber,
                    isValid: true
                    },
                    birdthdate: {
                    value: responseData.news.birdthdate,
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
				process.env.REACT_APP_BACKEND_URL + `/api/${usertype}/${userId}`,
				'PATCH',
				JSON.stringify({
					email: formState.inputs.email.value,
                    role: formState.inputs.role.value,
                    classyear: formState.inputs.classyear.value,
                    address: formState.inputs.address.value,
                    phonenumber: formState.inputs.phonenumber.value,
                    birdthdate: formState.inputs.birdthdate.value
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token
				}
			);
			history.push('/' + props.schoolname + '/utilisateurs');
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
			</Card>
		</div>
		);
	}

return (
	<React.Fragment>
		<ErrorModal error={error} onClear={clearError} />
		<br></br>
		{!isLoading && loadedUser && 
		<form 
			className="news-form" 
			onSubmit={userUpdateSubmitHandler}>
			<h2 className='form-news-title'>Mettre à jour cet utilisateur</h2>
			<Input
				id="email"
				element="input"
				type="text"
				label="Email"
				validators={[VALIDATOR_REQUIRE]}
				errorText="Veillez entrer une addresse email valide."
				onInput={inputHandler}
				initialValue={loadedUser.email}
				initialValid={true}
			/>

			<Button type="submit" disabled={!formState.isValid}>
				Mettre à jour
			</Button>
		</form>}
	</React.Fragment>
);
};

export default UpdateUser;