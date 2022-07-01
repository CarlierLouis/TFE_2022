import React, {useContext} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Input from '../../common/FormElements/Input';
import Button from '../../common/FormElements/Button';
import ErrorModal from '../../common/UIElements/ErrorModal';
import LoadingSpinner from '../../common/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../common/util/validators';
import { useForm } from '../../common/hooks/form-hooks';
import { useHttpClient } from '../../common/hooks/http-hook';
import {AuthContext} from '../../common/context/auth-context';
import ImageUpload from '../../common/FormElements/ImageUpload';
import MainNavigation from '../../common/navigation/MainNavigation';

import './News.css';

const NewNews = props => {
	const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
	const school = useParams().school;

    const [formState, inputHandler] = useForm(
		{
			title: {
				value: '',
				isValid: false
			},
			description: {
				value: '',
				isValid: false
			},
			date: {
				value: '',
				isValid: false
			},
			image: {
				value: null,
				isValid: false
			}
		},
		false
	);

    const history = useHistory();

    const newsSubmitHandler = async event => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
			formData.append('description', formState.inputs.description.value);
			formData.append('date', formState.inputs.date.value);
			formData.append('school', school);
			formData.append('image', formState.inputs.image.value);
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + '/api/news',
				'POST',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push(`/${school}/actualites`);
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
			<form className="news-form" onSubmit={newsSubmitHandler}>
				<h3 className='form-news-title'>Créer une nouvelle actualité</h3>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id="title"
					element="input"
					type="text"
					label="Titre (20 caractères max)"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
					errorText="Veillez entrer un titre valide."
					onInput={inputHandler}
				/>
				<Input
					id="description"
					element="textarea"
					label="Description"
					validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(645)]}
					errorText="Veillez entrer une description valide."
					onInput={inputHandler}
				/>
				<Input
					id="date"
					element="input"
					label="Date (15 caractères max)"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(15)]}
					errorText="Veillez entrer une date valide."
					onInput={inputHandler}
				/>
                <ImageUpload 
					id="image"
					onInput={inputHandler}
					errorText="Veillez entrer une image" />
					
				<Button type="submit" disabled={!formState.isValid}>
					Ajouter cette actualité
				</Button>
			</form>

			<br></br>

			<div className="back-button">
				<Button href={'/' + school + '/actualites'}>
					Retour
				</Button>
			</div>

			<br></br>
		</React.Fragment>
	);
};

export default NewNews;