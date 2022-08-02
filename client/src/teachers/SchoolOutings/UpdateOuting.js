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

import './SchoolOutings.css';

const UpdateOuting = props => {
    const auth = useContext(AuthContext);
    const outingId = useParams().outingId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedOuting, setLoadedOuting] = useState();
	const history = useHistory();
    const school = useParams().school;
    const [showConfirmModal, setShowConfirmModal] = useState(false);


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
		},
        file: {
			value: null,
			isValid: false
		}
		},
		false
	);

    useEffect(() => {
		const fetchOuting = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/outings/id/${outingId}`
				);
				setLoadedOuting(responseData.outing);
                
				setFormData({
					title: {
					value: responseData.outing.title,
					isValid: true
					},
                    start: {
                        value: responseData.outing.start,
                        isValid: true
                    },
                    end: {
                        value: responseData.outing.end,
                        isValid: true
                    },
                    file: {
                    value: responseData.outing.file,
                    isValid: true
                    }
				},true);
			}
			catch(err) {}
		};
		fetchOuting();
	}, 
	[sendRequest, outingId, setFormData]);

    const outingUpdateSubmitHandler = async event => {
		event.preventDefault();
		try {
			const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('start', formState.inputs.start.value);
            formData.append('end', formState.inputs.end.value);
            formData.append('file', formState.inputs.file.value);
            await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/outings/${outingId}`,
				'PATCH',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push('/' + school + '/espace-prof/sorties-scolaires');
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

    if (!loadedOuting && !error) {
		return (
		<div className="center">
			<Card>
			<h2>Aucune sortie scolaire trouvée !</h2>

			<div className="back-button">
				<Button href={'/' + school + '/espace-prof/sorties-scolaires'}>
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
				process.env.REACT_APP_BACKEND_URL + `/api/outings/${outingId}`,
				'DELETE',
				null,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push('/' + school + '/espace-prof/sorties-scolaires');
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
            footerClass="outing-item__modal-actions" 
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>Annuler</Button>
                    <Button danger onClick={confirmDeleteHandler}>Supprimer</Button>
                </React.Fragment>
                }>
                <p>
                Êtes-vous certain(e) de vouloir supprimer cette sortie scolaires ?
                Cette action entraînera la suppression irréversible de celle-ci !
                </p>
			  </Modal>

              {!isLoading && loadedOuting && 
            <form 
                className="outing-form" 
                onSubmit={outingUpdateSubmitHandler}>
                <h3 className='form-outing-title'>Mettre à jour cette sortie scolaire</h3>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Titre (30 caractères max)"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(30)]}
                    errorText="Veillez entrer un titre valide."
                    onInput={inputHandler}
                    initialValue={loadedOuting.title}
                    initialValid={true}
                />

                <Input
                    id="start"
                    element="input"
                    type="date"
                    label="Début"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veillez entrer une date valide."
                    onInput={inputHandler}
                    initialValue={loadedOuting.start.toString().substring(0, 10)}
                    initialValid={true}
                />

                <Input
                    id="end"
                    element="input"
                    type="date"
                    label="Fin"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Veillez entrer une date valide."
                    onInput={inputHandler}
                    initialValue={loadedOuting.end.toString().substring(0, 10)}
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
                    initialValue={loadedOuting.target}
                    initialValid={true}
                    disabled={true}
                />
                </div>

                <FileUpload 
                    id="file"
                    onInput={inputHandler}
					errorText="Veillez entrer un fichier valide" 
                    initialValue={loadedOuting.file}
                />

                <Button type="submit" disabled={!formState.isValid
                || (formState.inputs.start.value > formState.inputs.end.value)}>
                    Mettre à jour
                </Button>

                <img onClick={showDeleteWarningHandler} className="outing-delete" src="/svg/delete-red.svg"/>
            </form>}

            <br></br>
            <div className="back-button">
            <Button href={'/' + school + '/espace-prof/sorties-scolaires'}>
                Retour
            </Button>    
            <br></br><br></br>
            </div>


        </React.Fragment>
    )
}

export default UpdateOuting;
