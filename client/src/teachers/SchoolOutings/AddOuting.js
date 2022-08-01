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
import FileUpload from '../../common/FormElements/FileUpload';
import MainNavigation from '../../common/navigation/MainNavigation';

import './SchoolOutings.css';

const AddOuting = props => {
    const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
	const school = useParams().school;
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
			},
			file: {
				value: null,
				isValid: false
			}
		},
		false
	);

    const history = useHistory();

    const outingSubmitHandler = async event => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
            formData.append('start', formState.inputs.start.value);
            formData.append('end', formState.inputs.end.value);
			formData.append('school', school);
            formData.append('target', classname);
			formData.append('file', formState.inputs.file.value);
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + '/api/outings',
				'POST',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push(`/${school}/espace-prof/sorties-scolaires`);
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

            <form className="outing-form" onSubmit={outingSubmitHandler}>

				<h3 className='form-outing-title'>Ajouter une nouvelle sortie scolaire pour les <b>{classname}</b></h3>
			
				{isLoading && <LoadingSpinner asOverlay />}
				
                <Input
					id="title"
					element="input"
					type="text"
					label="Titre Titre (26 caractères max)"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(26)]}
					errorText="Veillez entrer un titre valide."
					onInput={inputHandler}
				/>

                <Input
					id="start"
					element="input"
					type="Date"
					label="Début"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(26)]}
					errorText="Veillez entrer une date valide."
					onInput={inputHandler}
				/>

                <Input
					id="end"
					element="input"
					type="Date"
					label="Fin"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(26)]}
					errorText="Veillez entrer une date valide."
					onInput={inputHandler}
				/>

                <FileUpload 
                    id="file"
                    onInput={inputHandler}
					errorText="Veillez entrer un fichier valide" 
                />
					
				<Button type="submit" disabled={!formState.isValid
                || (formState.inputs.start.value > formState.inputs.end.value)}>
					Ajouter cette sortie scolaire
				</Button>
			</form>

            <br></br>

			<div className="back-button">
				<Button href={'/' + school + '/espace-prof/sorties-scolaires'}>
					Retour
				</Button>
			</div>

			<br></br>

        </React.Fragment>
    )
}

export default AddOuting;