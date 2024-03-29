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
import Modal from '../../common/UIElements/Modal';
import MainNavigation from '../../common/navigation/MainNavigation';
import FileUpload from '../../common/FormElements/FileUpload';

import './Documents.css';

const UpdateDocument = props => {
    const auth = useContext(AuthContext);
    const documentId = useParams().documentId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedDocument, setLoadedDocument] = useState();
	const history = useHistory();
    const school = useParams().school;
    const [showConfirmModal, setShowConfirmModal] = useState(false);


    const [formState, inputHandler, setFormData] = useForm(
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

    useEffect(() => {
		const fetchDocument = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/documents/id/${documentId}`,
					'GET', null,
                    {Authorization: 'Bearer ' + auth.token}
				);
				setLoadedDocument(responseData.document);
                
				setFormData({
					title: {
					value: responseData.document.title,
					isValid: true
					},
                    file: {
                    value: responseData.document.file,
                    isValid: true
                    }
				},true);
			}
			catch(err) {}
		};
		fetchDocument();
	}, 
	[sendRequest, documentId, setFormData]);


    const documentUpdateSubmitHandler = async event => {
		event.preventDefault();
		try {
			const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('file', formState.inputs.file.value);
            await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/documents/${documentId}`,
				'PATCH',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push('/' + school + '/espace-prof/documents');
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

    if (!loadedDocument && !error) {
		return (
		<div className="center">
			<Card>
			<h2>Aucun document trouvé !</h2>

			<div className="back-button">
				<Button href={'/' + school + '/espace-prof/documents'}>
                    Retour
                </Button>
		    </div>
			</Card>
		</div>
		);
	}


    const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

    const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/documents/${documentId}`,
				'DELETE',
				null,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push('/' + school + '/espace-prof/documents');
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

            <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Êtes-vous sûr(e) ?" 
            footerClass="document-item__modal-actions" 
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>Annuler</Button>
                    <Button danger onClick={confirmDeleteHandler}>Supprimer</Button>
                </React.Fragment>
                }>
                <p>
                Êtes-vous certain(e) de vouloir supprimer ce document ?
                Cette action entraînera la suppression irréversible de celui-ci !
                </p>
			  </Modal>
            
            {!isLoading && loadedDocument && 
            <form 
                className="document-form" 
                onSubmit={documentUpdateSubmitHandler}>
                <h3 className='form-document-title'>Mettre à jour cet document</h3>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Titre (26 caractères max)"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(26)]}
                    errorText="Veillez entrer un titre valide."
                    onInput={inputHandler}
                    initialValue={loadedDocument.title}
                    initialValid={true}
                />

            <div  style={{opacity: "0.7"}}>
            <Input 
				id="target"
				element="input"
				type="text"
				label="Classe"
				validators={[VALIDATOR_REQUIRE]}
				errorText="Veillez entrer une classe valide."
				onInput={inputHandler}
				initialValue={loadedDocument.target}
				initialValid={true}
                disabled={true}
			/>
            </div>

                <FileUpload 
                    id="file"
                    onInput={inputHandler}
					errorText="Veillez entrer un fichier valide" 
                    initialValue={loadedDocument.file}
                />

                <Button type="submit" disabled={!formState.isValid}>
                    Mettre à jour
                </Button>

                <img onClick={showDeleteWarningHandler} className="document-delete" src="/svg/delete-red.svg"/>
            </form>}

            <br></br>
            <div className="back-button">
            <Button href={'/' + school + '/espace-prof/documents'}>
                Retour
            </Button>    
            <br></br><br></br>
            </div>
        </React.Fragment>
    )
}

export default UpdateDocument;