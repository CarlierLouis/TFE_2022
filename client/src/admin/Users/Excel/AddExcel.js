import React, {useContext} from 'react';

import { useParams } from 'react-router-dom';
import {AuthContext} from '../../../common/context/auth-context';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useForm } from '../../../common/hooks/form-hooks';
import XLSXUpload from '../../../common/FormElements/XLSXUpload';
import Button from '../../../common/FormElements/Button';
import ErrorModal from '../../../common/UIElements/ErrorModal';
import LoadingSpinner from '../../../common/UIElements/LoadingSpinner';
import MainNavigation from '../../../common/navigation/MainNavigation';

import './AddExcel.css';

const AddExcel = props => {
    const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const school = useParams().school;

    const [formState, inputHandler] = useForm(
		{
			xlsx: {
				value: null,
				isValid: false
			}
		},
		false
	);

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
            <form className="excel-form">
                <h4 className='form-excel-title'>Ajouter des élèves de confiances via un fichier excel (.xlsx)</h4>
                {isLoading && <LoadingSpinner asOverlay />}
                <XLSXUpload
                id="xlsx"
                onInput={inputHandler}
                errorText="Veillez sélectionner un fichier valide"/>

                <Button type="submit" disabled={!formState.isValid}>
					Soumettre
				</Button>
            </form>

            <br></br>

            <div className="back-button">
                <Button href={'/' + school + '/admin/utilisateurs/white-list-eleves'}>
                    Retour
                </Button>
                <br></br><br></br>
            </div>
        </React.Fragment>
    );
};

export default AddExcel;