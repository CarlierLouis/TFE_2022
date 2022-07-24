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

import './PersonnalCalendar.css';

const AddTargetedEvent = props => {
    const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
	const school = useParams().school;
	const history = useHistory();
    const classname = useParams().classname;

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


    const targetedeventSubmitHandler = async event => {
		event.preventDefault();        
        try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/calendar`,
				'POST',
				JSON.stringify({
					title: formState.inputs.title.value,
                    start: formState.inputs.start.value,
                    end: formState.inputs.end.value,
                    school: school,
                    target: classname,
				}),
				{
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token
				}
			);
			history.push(`/${school}/espace-prof/horaires`);
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

            <form className="targeted-event-form" onSubmit={targetedeventSubmitHandler}>
				<h3 className='form-targeted-event-title'>Ajouter un nouvel événement à l'horaire des <b>{classname}</b></h3>
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
				<Button href={'/' + school + '/espace-prof/horaires'}>
					Retour
				</Button>
			</div>

			<br></br>

        </React.Fragment>
    )
}

export default AddTargetedEvent;
