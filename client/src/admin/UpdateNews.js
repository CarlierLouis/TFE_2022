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
import ImageUpload from '../common/FormElements/ImageUpload';
import Card from '../common/UIElements/Card';

import './News.css';

const UpdateNews = props => {
    const auth = useContext(AuthContext);
    const newsId = useParams().newsId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedNews, setLoadedNews] = useState();
	const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
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

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/news/id/${newsId}`
				);
				setLoadedNews(responseData.news);
				setFormData({
					title: {
					value: responseData.news.title,
					isValid: true
					},
					description: {
					value: responseData.news.description,
					isValid: true
					},
					date: {
					value: responseData.news.date,
					isValid: true
					},
					image: {
					value: responseData.news.image,
					isValid: true
					}
				},true);
			}
			catch(err) {}
		};
		fetchNews();
	}, 
	[sendRequest, newsId, setFormData]);

	const newsUpdateSubmitHandler = async event => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/news/${newsId}`,
				'PATCH',
				JSON.stringify({
					title: formState.inputs.title.value,
					description: formState.inputs.description.value,
					date: formState.inputs.date.value,
					image: formState.inputs.image.value
				}),
				{
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + auth.token
				}
			);
			history.push('/' + props.school + '/actu');
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

	if (!loadedNews && !error) {
		return (
		<div className="center">
			<Card>
			<h2>Aucune actualité trouvée !</h2>
			</Card>
		</div>
		);
	}

return (
	<React.Fragment>
		<ErrorModal error={error} onClear={clearError} />
		<br></br>
		{!isLoading && loadedNews && 
		<form 
			className="news-form" 
			onSubmit={newsUpdateSubmitHandler}>
			<h2 className='form-news-title'>Mettre à jour cette actualité</h2>
			<Input
				id="title"
				element="input"
				type="text"
				label="Titre"
				validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(20)]}
				errorText="Veillez entrer un titre valide."
				onInput={inputHandler}
				initialValue={loadedNews.title}
				initialValid={true}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				validators={[VALIDATOR_MINLENGTH(10)]}
				errorText="Veillez entrer une description valide."
				onInput={inputHandler}
				initialValue={loadedNews.description}
				initialValid={true}
			/>
			<Input
				id="date"
				element="input"
				label="Date"
				validators={[VALIDATOR_REQUIRE]}
				errorText="Veillez entrer une date valide."
				onInput={inputHandler}
				initialValue={loadedNews.date}
				initialValid={true}
			/>
			{/*
			 <ImageUpload 
					id="image" 
					onInput={inputHandler}
					errorText="Veillez entrer une image"
					initialValid={true} />
			*/}

			<Button type="submit" disabled={!formState.isValid}>
				Mettre à jour
			</Button>
		</form>}

		<br></br>
		<div className="back-button">
		<Button href={'/' + props.school + '/actu'}>
			Retour
		</Button>
		</div>
	</React.Fragment>
);
};

export default UpdateNews;