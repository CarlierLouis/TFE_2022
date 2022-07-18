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
import Card from '../../common/UIElements/Card';
import MainNavigation from '../../common/navigation/MainNavigation';

import './GlobalCalendar.css';

const updateEvent = props => {
    const auth = useContext(AuthContext);
    const eventId = useParams().eventId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedEvent, setLoadedEvent] = useState();
	const history = useHistory();
	const school = useParams().school;

    const [formState, inputHandler, setFormData] = useForm(
		{
		title: {
			value: '',
			isValid: false
		},
        start: {
			value: '',
			isValid: false
		},
        end: {
			value: '',
			isValid: false
		}
		},
		false
	);

    useEffect(() => {
		const fetchEvent = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/calendar/id/${eventId}`
				);
				setLoadedEvent(responseData.event);

				setFormData({
					title: {
					value: responseData.event.title,
					isValid: true
					},
                    start: {
                        value: responseData.event.start,
                        isValid: true
                    },
                    end: {
                        value: responseData.event.end,
                        isValid: true
                    },
				},true);
			}
			catch(err) {}
		};
		fetchEvent();
	}, 
	[sendRequest, eventId, setFormData]);


    const eventUpdateSubmitHandler = async event => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/calendar/${eventId}`,
				'PATCH',
				JSON.stringify({
					title: formState.inputs.title.value,
                    start: formState.inputs.start.value,
                    end: formState.inputs.end.value,
				}),
				{
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token
				}
			);
			history.push('/' + school + '/agenda');
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

	if (!loadedEvent && !error) {
		return (
		<div className="center">
			<Card>
			<h2>Aucun événement trouvé !</h2>

            <div className="back-button">
                <Button href={'/' + school + '/agenda'}>
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
            {!isLoading && loadedEvent && 
		    <form
            className="event-form" 
			onSubmit={eventUpdateSubmitHandler}>
			<h3 className='form-event-title'>Mettre à jour cet événement</h3>

            <Input
				id="title"
				element="input"
				type="text"
				label="Titre"
				validators={[VALIDATOR_REQUIRE]}
				errorText="Veillez entrer un événement valide."
				onInput={inputHandler}
				initialValue={loadedEvent.title}
				initialValid={true}
			/>

            <Input
			id="start"
			element="input"
			type="date"
			label="Début"
			validators={[VALIDATOR_REQUIRE]}
			errorText="Veillez entrer une date valide."
			onInput={inputHandler}
			initialValue={loadedEvent.start.toString().substring(0, 10)}
			initialValid={true}
			/>

            <Input
			id="end"
			element="input"
			type="date"
			label="Fin"
			validators={[VALIDATOR_REQUIRE]}
			errorText="Veillez entrer une date valide."
			onInput={inputHandler}
			initialValue={loadedEvent.end.toString().substring(0, 10)}
			initialValid={true}
			/>
			

			<Button type="submit" disabled={!formState.isValid 
            || (formState.inputs.start.value > formState.inputs.end.value)}>
				Mettre à jour
			</Button>
		</form>}

        <br></br>
		<div className="back-button">
		<Button href={'/' + school + '/agenda'}>
			Retour
		</Button>
		</div>
		<br></br>
        </React.Fragment>
    )
}

export default updateEvent;