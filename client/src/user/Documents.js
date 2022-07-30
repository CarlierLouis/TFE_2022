import React, {useContext, useEffect, useState} from 'react';

import { AuthContext } from '../common/context/auth-context';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../common/hooks/http-hook';
import Card from '../common/UIElements/Card';
import Button from '../common/FormElements/Button';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';

import './Documents.css';
import '../teachers/Documents/Documents.css';

const Documents = props => {
    const school = useParams().school;
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedDocuments, setLoadedDocuments] = useState();

    if (auth.isLoggedIn && (auth.role == "Admin" || auth.role == "Default")){
        var usertypeSpace = "espace-prof"
    }
    if (auth.isLoggedIn && auth.role == "Student"){
        var usertypeSpace = "espace-personnel"
    }


    useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/documents/${school}/${props.classyear}`
				);
				setLoadedDocuments(responseData.documents);
			}
			catch(err) {}
		};
		fetchDocuments();
	}, 
	[sendRequest]);

    return (
        <React.Fragment>
            <Card className="documents-card">

            <h2 style={{textAlign: 'center'}}>Documents utiles et/ou importants</h2><br></br>

            {(auth.role == "Default" || auth.role == "Admin") && 
            <a href={`/${school}/espace-prof/documents/${props.classyear}/ajouter-document`}>
                <img className='red-plus-add-document' src='/svg/red-plus.svg'></img>
            </a>}

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}

            {(auth.role == "Default" || auth.role == "Admin") &&
                <div>
                    <h4 className="documents-class-title">Classe: {props.classyear}</h4>
                    <h5 className="documents-change-class">
                        <a href={"/" + school + "/espace-prof" + "/documents"}>Changer de classe</a>
                    </h5>
                   <br></br>
                </div>}

            
               {loadedDocuments && loadedDocuments.length == 0 &&
                    <div className="center">
                        <Card>
                        <h2>Aucun document trouvé</h2>
                        </Card>
                    </div>
                }


            {!isLoading && loadedDocuments && 
            <ul className="documents-list">
            {loadedDocuments.map(documents => (
                <li>
                <a href={process.env.REACT_APP_BACKEND_URL + `/${documents.file}`} target="_blank">
                <Button>
                    <img className="document-img" src="/svg/pdf.svg" />
                    &nbsp;&nbsp;{documents.title}
                </Button>
                </a><br></br><br></br>
                </li>
            ))}
            </ul>}
                
            </Card>
        </React.Fragment>
    )
}

export default Documents;