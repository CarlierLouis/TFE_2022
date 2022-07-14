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
import MainNavigation from '../../common/navigation/MainNavigation';

import './GlobalCalendar.css';

const NewEvent = props => {
    const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
	const school = useParams().school;

    const [formState, inputHandler] = useForm(
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

    const history = useHistory();

    const eventSubmitHandler = async event => {
		event.preventDefault();
        /*
		try {
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
			formData.append('start', formState.inputs.start.value);
			formData.append('end', formState.inputs.end.value);
			formData.append('school', school);
            formData.append('target', "global");
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + '/api/calendar',
				'POST',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push(`/${school}/agenda`);
		}*/
        
        try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/calendar`,
				'POST',
				JSON.stringify({
					title: formState.inputs.title.value,
                    start: formState.inputs.start.value,
                    end: formState.inputs.end.value,
                    school: school,
                    target: "global",
				}),
				{
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token
				}
			);
			history.push(`/${school}/agenda`);
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

            <form className="event-form" onSubmit={eventSubmitHandler}>
				<h3 className='form-event-title'>Ajouter un nouvel événement à l'agenda</h3>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id="title"
					element="input"
					type="text"
					label="Titre"
					validators={[VALIDATOR_REQUIRE()]}
					errorText="Veillez entrer un titre valide."
					onInput={inputHandler}
				/>

                <Input
                    id="start"
                    element="input"
                    type="date"
                    label="Début"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Veillez entrer une date valide."
                    onInput={inputHandler}
			    />

                 <Input
                    id="end"
                    element="input"
                    type="date"
                    label="Fin"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Veillez entrer une date valide."
                    onInput={inputHandler}
                />
					
				<Button type="submit" disabled={!formState.isValid 
												|| (formState.inputs.start.value > formState.inputs.end.value)}>
					Ajouter cet événement
				</Button>
			</form>

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

export default NewEvent;