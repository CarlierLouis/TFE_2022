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

import './Documents.css';

const AddDocument = props => {
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
			file: {
				value: null,
				isValid: false
			}
		},
		false
	);

    const history = useHistory();

    const documentSubmitHandler = async event => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('title', formState.inputs.title.value);
			formData.append('school', school);
            formData.append('target', classname);
			formData.append('file', formState.inputs.file.value);
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + '/api/documents',
				'POST',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push(`/${school}/espace-prof/documents`);
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

            <form className="document-form" onSubmit={documentSubmitHandler}>
				<h3 className='form-document-title'>Ajouter un nouveau document pour les <b>{classname}</b></h3>

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

                <FileUpload 
                    id="file"
                    onInput={inputHandler}
					errorText="Veillez entrer un document valide" 
                />
					
				<Button type="submit" disabled={!formState.isValid}>
					Ajouter ce document
				</Button>
			</form>

            <br></br>

			<div className="back-button">
				<Button href={'/' + school + '/espace-prof/documents'}>
					Retour
				</Button>
			</div>

			<br></br>
        </React.Fragment>
    )
}

export default AddDocument;