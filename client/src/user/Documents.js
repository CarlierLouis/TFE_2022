import React, {useContext, useEffect, useState} from 'react';

import { AuthContext } from '../common/context/auth-context';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../common/hooks/http-hook';
import Card from '../common/UIElements/Card';
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
            {(auth.role == "Default" || auth.role == "Admin") && 
            <a href={`/${school}/espace-prof/documents/${props.classyear}/ajouter-document`}>
                <img className='red-plus-add-document' src='/svg/red-plus.svg'></img>
            </a>}

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}

            {!isLoading && loadedDocuments && 
            <ul className="documents-list">
            {loadedDocuments.map(documents => (
                <li>
                <a href={process.env.REACT_APP_BACKEND_URL + `/${documents.file}`} target="_blank">
                    {documents.title}
                </a>
                </li>
            ))}
            </ul>}
                
            </Card>
        </React.Fragment>
    )
}

export default Documents;