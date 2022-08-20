import React, { useContext, useState } from 'react';

import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../../common/context/auth-context';
import { useHttpClient } from '../../../common/hooks/http-hook';
import { useForm } from '../../../common/hooks/form-hooks';
import XLSXUpload from '../../../common/FormElements/XLSXUpload';
import Button from '../../../common/FormElements/Button';
import ErrorModal from '../../../common/UIElements/ErrorModal';
import Modal from '../../../common/UIElements/Modal';
import LoadingSpinner from '../../../common/UIElements/LoadingSpinner';
import MainNavigation from '../../../common/navigation/MainNavigation';

import './AddExcel.css';

const AddExcel = props => {
    const auth = useContext(AuthContext);
	const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const school = useParams().school;
    const history = useHistory();

    const [showQuestion, setShowQuestion] = useState(false);

    const openQuestionHandler = () => {
		setShowQuestion(true);
	};

	const closeQuestionHandler = () => {
		setShowQuestion(false);
	};


    const [formState, inputHandler] = useForm(
		{
			xlsx: {
				value: null,
				isValid: false
			}
		},
		false
	);

    const xlsxSubmitHandler = async event => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('school', school);
            formData.append('xlsx', formState.inputs.xlsx.value);
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + '/api/trusted-students/add-xlsx',
				'POST',
				formData,
				{Authorization: 'Bearer ' + auth.token}
			);
			history.push(`/${school}/admin/utilisateurs`);
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


            <Modal className='question-modal-excel'
                show={showQuestion}
                onCancel={closeQuestionHandler}
                footer={<Button onClick={closeQuestionHandler}>Fermer</Button>}>

                <h5>Sur cette page vous pouvez sélectionner un fichier excel afin d'ajouter
                toute une liste d'élèves de confiance simultanément.</h5>

                <br></br>
                
                <p className='italic'>Merci de suivre la structure de l'exemple suivant:</p>

                <img src='/img/excel.png'/>
                
            </Modal>

            <ErrorModal error={error} onClear={clearError} />
			<br></br>
            <form className="excel-form" onSubmit={xlsxSubmitHandler}>
                <h4 className='form-excel-title'>Ajouter des élèves de confiances à la White List</h4>

                <hr></hr>
                <p style={{color: "red", textAlign: "center"}}>L'ajout de ce fichier permet également de mofidier
                 les classes des élèves ainsi que de supprimer les comptes de ceux n'étant plus inscrits 
                 dans l'établissement.</p>

                 <p style={{color: "red", textAlign: "center"}}>Vérifiez donc bien lors de la soumission 
                 du fichier excel que les informations renseignées dans celui-ci soient bien correctes et que 
                 tous les élèves inscrits pour la nouvelle année à venir soient mentionnés dans la liste.</p>

                 <hr></hr>

                <h6 className='form-excel-title italic'>Type de fichier accepté: XLSX</h6>
                {isLoading && <LoadingSpinner asOverlay />}
                <XLSXUpload
                id="xlsx"
                onInput={inputHandler}
                errorText="Veillez sélectionner un fichier valide"/>

                <img className='question-excel' src='/svg/info.svg' onClick={openQuestionHandler} ></img>
                <br></br>
                <Button type="submit" disabled={!formState.isValid}>
					Soumettre
				</Button>
            </form>

        

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