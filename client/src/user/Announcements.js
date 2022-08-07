import React, {useContext, useEffect, useState} from 'react';

import { AuthContext } from '../common/context/auth-context';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../common/hooks/http-hook';
import Card from '../common/UIElements/Card';
import Button from '../common/FormElements/Button';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';

import './Announcements.css';
import '../teachers/Announcements/Announcements.css';

const Announcement = props => {
    const school = useParams().school;
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedAnnouncements, setLoadedAnnouncements] = useState();

    useEffect(() => {
		const fetchAnnouncements = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + `/api/announcements/${school}/target/${props.classyear}`
				);
				setLoadedAnnouncements(responseData.announcements);
			}
			catch(err) {}
		};
		fetchAnnouncements();                    
	}, 
	[sendRequest]);

    return (
        <React.Fragment>

            <Card className="announcements-card">

            <h2 className='announcements-title'>Annonces</h2><br></br>

            {(auth.role == "Default" || auth.role == "Admin") && 
            <a href={`/${school}/espace-prof/annonces/${props.classyear}/ajouter-annonce`}>
                <img className='red-plus-add-outing' src='/svg/red-plus.svg'></img>
            </a>}

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}

            {(auth.role == "Default" || auth.role == "Admin") &&
                <div>
                    <h4 className="announcements-class-title">Classe: {props.classyear}</h4>

                    <h5 className="announcements-change-class">
                        <a href={"/" + school + "/espace-prof" + "/annonces"}>Changer de classe</a>
                    </h5>
                <br></br>
                </div>}


                {loadedAnnouncements && loadedAnnouncements.length == 0 &&
                    <div className="center">
                        <Card>
                        <h2>Aucune annonce trouvée</h2>
                        </Card>
                    </div>
                }


                {!isLoading && loadedAnnouncements && 
                <ul className="announcements-list">
                    {loadedAnnouncements.map(announcements => (
                    <li>
                        {(((auth.role == "Student") 
                        || (auth.role == "Admin") 
                        || (auth.role == "Default" && announcements.teacherid == auth.userId))) &&
                        
                        <Card className="announcement-item-card">

                        <h6>Posté le: {announcements.posteddate.toString().substring(8, 10)}/{announcements.posteddate.toString().substring(5, 7)}/{announcements.posteddate.toString().substring(0, 4)}</h6>
                        <br></br>
                        <h4>{announcements.title}</h4>
                        <p>{announcements.description}</p>


                        {auth.role == "Default" && announcements.target != "global" &&
                         <a href={`/${school}/espace-prof/annonces/maj-annonce/${announcements.id}`}>
                         <img className="announcement-modify" src="/svg/modify-red.svg" />
                         </a>}
                        
                        {auth.role == "Admin" &&
                        <a href={`/${school}/espace-prof/annonces/maj-annonce/${announcements.id}`}>
                        <img className="announcement-modify" src="/svg/modify-red.svg" />
                        </a>}
                        </Card>
                        }


                    <br></br>
                </li>
            ))}
            </ul>}
                
            </Card>
            <br></br>

        </React.Fragment>
    )
}

export default Announcement;