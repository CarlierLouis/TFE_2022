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

import './Announcements.css';

const UpdateAnnouncement = props => {
    const auth = useContext(AuthContext);
    const announcementId = useParams().announcementId;
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedAnnouncement, setLoadedAnnouncement] = useState();
	const history = useHistory();
    const school = useParams().school;
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [formState, inputHandler, setFormData] = useForm(
		{
		title: {
			value: '',
			isValid: false
		},
        description: {
			value: '',
			isValid: false
        }
		},
		false
	);

    useEffect(() => {
		const fetchAnnouncement = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/announcements/id/${announcementId}`
				);
				setLoadedAnnouncement(responseData.announcement);

				setFormData({
					title: {
					value: responseData.announcement.title,
					isValid: true
					},
                    description: {
                        value: responseData.announcement.description,
                        isValid: true
                    },
				},true);
			}
			catch(err) {}
		};
		fetchAnnouncement();
	}, 
	[sendRequest, announcementId, setFormData]);

    const announcementUpdateSubmitHandler = async event => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/announcements/${announcementId}`,
				'PATCH',
				JSON.stringify({
					title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
				}),
				{
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token
				}
			);
			history.push('/' + school + '/espace-prof/annonces');
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

    if (!loadedAnnouncement && !error) {
		return (
		<div className="center">
			<Card>
			<h2>Aucune annonce trouvée !</h2>

            <div className="back-button">
                <Button href={'/' + school + '/espace-prof/annonces'}>
                    Retour
                </Button>
		    </div>
			</Card>
		</div>
		);
	};

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
				process.env.REACT_APP_BACKEND_URL + `/api/announcements/${announcementId}`,
				'DELETE',
				null,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push('/' + school + '/espace-prof/annonces');
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
            footerClass="announcement-item__modal-actions" 
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>Annuler</Button>
                    <Button danger onClick={confirmDeleteHandler}>Supprimer</Button>
                </React.Fragment>
                }>
                <p>
                Êtes-vous certain(e) de vouloir supprimer cette annonce ?
                Cette action entraînera la suppression irréversible de celle-ci!
                </p>
			  </Modal>

            {!isLoading && loadedAnnouncement && 
		    <form
            className="announcement-form" 
			onSubmit={announcementUpdateSubmitHandler}>
			<h3 className='form-announcement-title'>Mettre à jour cette annonce</h3>

            <Input
				id="title"
				element="input"
				type="text"
				label="Titre (26 caractères max)"
				validators={[VALIDATOR_REQUIRE]}
				errorText="Veillez entrer un titre valide."
				onInput={inputHandler}
				initialValue={loadedAnnouncement.title}
				initialValid={true}
			/>

            <div  style={{opacity: "0.7"}}>
            <Input 
				id="target"
				element="input"
				type="text"
				label="Classe"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Veillez entrer une classe valide."
				onInput={inputHandler}
				initialValue={loadedAnnouncement.target}
				initialValid={true}
                disabled={true}
			/>
            </div>

            <Input
				id="description"
				type="textarea"
				label="Description"
				validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(645)]}
				errorText="Veillez entrer une description valide."
				onInput={inputHandler}
				initialValue={loadedAnnouncement.description}
				initialValid={true}
			/>

			

			<Button type="submit" disabled={!formState.isValid}>
				Mettre à jour
			</Button>

            <img onClick={showDeleteWarningHandler} className="announcement-delete" src="/svg/delete-red.svg"/>
		</form>}

        <br></br>
		<div className="back-button">
		<Button href={'/' + school + '/espace-prof/annonces'}>
			Retour
		</Button>
		</div>
		<br></br>

        </React.Fragment>
    )
}

export default UpdateAnnouncement;