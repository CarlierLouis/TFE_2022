import React, {useContext, useEffect, useState} from 'react';

import { AuthContext } from '../common/context/auth-context';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../common/hooks/http-hook';
import Card from '../common/UIElements/Card';
import Button from '../common/FormElements/Button';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';

import './SchoolOutings.css';
import '../teachers/SchoolOutings/SchoolOutings.css';

const SchoolOutings = props => {
    const school = useParams().school;
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedOutings, setLoadedOutings] = useState();


    useEffect(() => {
		const fetchOutings = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/outings/${school}/target/${props.classyear}`
				);
				setLoadedOutings(responseData.outings);
			}
			catch(err) {}
		};
		fetchOutings();
	}, 
	[sendRequest]);

    return (
        <React.Fragment>

            <Card className="outings-card">

            <h2 style={{textAlign: 'center'}}>Sorties scolaires programmées</h2><br></br>

            {(auth.role == "Default" || auth.role == "Admin") && 
            <a href={`/${school}/espace-prof/sorties-scolaires/${props.classyear}/ajouter-sortie-scolaire`}>
                <img className='red-plus-add-outing' src='/svg/red-plus.svg'></img>
            </a>}

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}

            {(auth.role == "Default" || auth.role == "Admin") &&
                <div>
                    <h4 className="outings-class-title">Classe: {props.classyear}</h4>

                    <h5 className="outings-change-class">
                        <a href={"/" + school + "/espace-prof" + "/sorties-scolaires"}>Changer de classe</a>
                    </h5>
                <br></br>
                </div>}


                {loadedOutings && loadedOutings.length == 0 &&
                    <div className="center">
                        <Card>
                        <h2>Aucune sortie scolaire trouvée</h2>
                        </Card>
                    </div>
                }


            {!isLoading && loadedOutings && 
            <ul className="outings-list">
            {loadedOutings.map(outings => (
                <li>

                <h4>{outings.title}</h4>
                <div className='outings-date-div'>

                {outings.start == outings.end &&
                <h5>{outings.start.toString().substring(8, 10)}/{outings.start.toString().substring(5, 7)}/{outings.start.toString().substring(0, 4)}</h5>
                }

                {outings.start != outings.end &&
                <h5>Du {outings.start.toString().substring(8, 10)}/{outings.start.toString().substring(5, 7)}/{outings.start.toString().substring(0, 4)}
                &nbsp;au {outings.end.toString().substring(8, 10)}/{outings.end.toString().substring(5, 7)}/{outings.end.toString().substring(0, 4)}</h5>
                }               
                </div>
                <a href={process.env.REACT_APP_BACKEND_URL + `/${outings.file}`} target="_blank">
                <Button>
                    <img className="outing-img" src="/svg/pdf.svg" />
                    &nbsp;&nbsp;Document
                </Button>

                </a>

                {(auth.role == "Default" || auth.role == "Admin") &&
                <a href={`/${school}/espace-prof/sorties-scolaires/maj-sortie-scolaire/${outings.id}`}>
                <img className="outing-modify" src="/svg/modify-red.svg" />
                </a>}

            
                <br></br><br></br><br></br>
                </li>
            ))}
            </ul>}
                
            </Card>

        </React.Fragment>
    )
}

export default SchoolOutings;