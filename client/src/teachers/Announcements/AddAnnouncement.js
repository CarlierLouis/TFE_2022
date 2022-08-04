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

import './Announcements.css';

const AddAnnouncement = props => {
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
            description: {
				value: '',
				isValid: false
			}
		},
		false
	);


    const history = useHistory();

    const today = new Date();


    const AnnouncementSubmitHandler = async event => {
		event.preventDefault();
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/announcements`,
				'POST',
				JSON.stringify({
					title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    posteddate: today,
                    school: school,
                    target: classname,
				}),
				{
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + auth.token
				}
			);
			history.push(`/${school}/espace-prof/annonces`);
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

            <form className="announcement-form" onSubmit={AnnouncementSubmitHandler}>

			{classname != "global" &&
				<h3 className='form-announcement-title'>Ajouter une nouvelle annonce pour les <b>{classname}</b></h3>}

				{classname == "global" &&
				<h3 className='form-announcement-title'>Ajouter une nouvelle annonce pour toutes les classes</h3>}

			
				{isLoading && <LoadingSpinner asOverlay />}
				
                <Input
					id="title"
					element="input"
					type="text"
					label="Titre (26 caractères max)"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(26)]}
					errorText="Veillez entrer un titre valide."
					onInput={inputHandler}
				/>

                <Input
					id="description"
					type="textarea"
					label="Description"
					validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(645)]}
					errorText="Veillez entrer une description valide."
					onInput={inputHandler}
				/>
                
					
				<Button type="submit" disabled={!formState.isValid}>
					Ajouter cette annnonce
				</Button>
			</form>

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

export default AddAnnouncement;