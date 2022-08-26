import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

import Input from '../../common/FormElements/Input';
import Button from '../../common/FormElements/Button';
import ErrorModal from '../../common/UIElements/ErrorModal';
import LoadingSpinner from '../../common/UIElements/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../common/util/validators';
import { useForm } from '../../common/hooks/form-hooks';
import { useHttpClient } from '../../common/hooks/http-hook';
import {AuthContext} from '../../common/context/auth-context';
import ImageUpload from '../../common/FormElements/ImageUpload';
import Card from '../../common/UIElements/Card';
import MainNavigation from '../../common/navigation/MainNavigation';

import './News.css';

const UpdateNews = props => {
    const auth = useContext(AuthContext);
    const newsId = useParams().newsId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedNews, setLoadedNews] = useState();
	const history = useHistory();
	const school = useParams().school;

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
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
			formData.append('description', formState.inputs.description.value);
			formData.append('date', formState.inputs.date.value);
			formData.append('image', formState.inputs.image.value);
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/news/${newsId}`,
				'PATCH',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push('/' + school + '/actualites');
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

			<div className="back-button">
				<Button href={'/' + school + '/actualites'}>
                    Retour
                </Button>
		    </div>
			</Card>
		</div>
		);
	}

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
		{!isLoading && loadedNews && 
		<form 
			className="news-form" 
			onSubmit={newsUpdateSubmitHandler}>
			<h3 className='form-news-title'>Mettre à jour cette actualité</h3>
			<Input
				id="title"
				element="input"
				type="text"
				label="Titre (20 caractères max)"
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
				validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(645)]}
				errorText="Veillez entrer une description valide."
				onInput={inputHandler}
				initialValue={loadedNews.description}
				initialValid={true}
			/>
			<Input
				id="date"
				element="input"
				label="Date (15 caractères max)"
				validators={[VALIDATOR_REQUIRE, VALIDATOR_MAXLENGTH(15)]}
				errorText="Veillez entrer une date valide."
				onInput={inputHandler}
				initialValue={loadedNews.date}
				initialValid={true}
			/>
			
			<ImageUpload 
				id="image" 
				onInput={inputHandler}
				errorText="Veillez entrer une image"
				initialValue={loadedNews.image}
				initialValid={true}
				updatePreview={process.env.REACT_APP_WAS_S3_BUCKET_URL + `/images/${loadedNews.image}`}
			/>
			

			<Button type="submit" disabled={!formState.isValid}>
				Mettre à jour
			</Button>
		</form>}

		<br></br>
		<div className="back-button">
		<Button href={'/' + school + '/actualites'}>
			Retour
		</Button>
		<br></br><br></br>
		</div>
	</React.Fragment>
);
};

export default UpdateNews;