import React, { useState, useEffect, useContext, useCallback } from "react";

import MainNavigation from '../common/navigation/MainNavigation';
import { useParams } from "react-router-dom";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import fr from "date-fns/locale/fr";
import Card from "../common/UIElements/Card";
import  { useHttpClient } from '../common/hooks/http-hook';
import { AuthContext } from '../common/context/auth-context';
import ErrorModal from '../common/UIElements/ErrorModal';
import LoadingSpinner from '../common/UIElements/LoadingSpinner';
import Modal from "../common/UIElements/Modal";
import Button from "../common/FormElements/Button";

import './GlobalCalendar.css';
import '../admin/GlobalCalendar/GlobalCalendar.css';


const locales = {
    "fr": fr
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})


const GlobalCalendar = props => {
    const auth = useContext(AuthContext);
    const [loadedCalendar, setLoadedCalendar] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const school = useParams().school;
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [loadedEventTitle, setLoadedEventTitle] = useState();
    const [loadedEventStart, setLoadedEventStart] = useState();
    const [loadedEventEnd, setLoadedEventEnd] = useState();
    const [loadedEventId, setLoadedEventId] = useState();

    useEffect(() => {
        const fetchcalendar = async () => {
            const events = [];
            try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/api/calendar/${school}`, 'GET', null,
            {Authorization: 'Bearer ' + auth.token});

            responseData.events.forEach(element => {
                const event = {
                    id: element.id,
                    allDay: true,
                    title: element.title,
                    start: element.start,
                    end: element.end
                }

                events.push(event);

            });

            setLoadedCalendar(events);

            }
            catch(err) {}
        };
        fetchcalendar();
    }, [sendRequest]);


    const showDeleteWarningHandler = () => {
		setShowConfirmModal(true);
	};

	const cancelDeleteHandler = () => {
		setShowConfirmModal(false);
	};

    
    const closeMoreHandler = () => {
      setShowMore(false);
      };

      const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/calendar/${loadedEventId}`,
				'DELETE',
				null,
				{Authorization: 'Bearer ' + auth.token}
			);
		}
		catch(err) {}

    if (!error) {
    refreshPage();
    }
	};


    const refreshPage = () =>{
        window.location.reload(true);
    }

    
    const onSelectEvent = useCallback((calEvent) => {
        setShowMore(true);
        setLoadedEventId(calEvent.id);
        setLoadedEventTitle(calEvent.title);
        setLoadedEventStart(calEvent.start.toString().substring(0, 10));
        setLoadedEventEnd(calEvent.end.toString().substring(0, 10));
      })
    

    return(
        <React.Fragment>
            {school == "grand-hallet" && 
                <MainNavigation schoolLink="grand-hallet"
                                schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"   
                            schoolLogo="/svg/Moxhe_blanc.svg" />}
           
            <ErrorModal error={error} onClear={clearError} />

            
            <Modal
            show={showMore}
            onCancel={closeMoreHandler}
            footer={<Button onClick={closeMoreHandler}>Fermer</Button>}>
            
            {auth.isLoggedIn && auth.role == "Admin" &&
            <a href={`/${school}/agenda/admin/maj-evenement-calendrier/${loadedEventId}`}>
                <img className="event-modify" src="/svg/modify-red.svg" />
            </a>}
            
            <div className="full-info-event">
                <div className="full-info-event-elem">
                <p className="full-info-event-elem-title">Titre: &nbsp;</p>
                <p>{loadedEventTitle}</p>
                </div>

                <div className="full-info-event-elem">
                <p className="full-info-event-elem-title">Début: &nbsp;</p>
                <p>{loadedEventStart}</p>
                </div>

                <div className="full-info-event-elem"> 
                <p className="full-info-event-elem-title">Fin: &nbsp;</p>
                <p>{loadedEventEnd}</p>
                </div>
                
                {auth.isLoggedIn && auth.role == "Admin" &&
                <img onClick={showDeleteWarningHandler} className="event-delete" src="/svg/delete-red.svg"/>}
            </div>
            </Modal>

            <Modal 
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Êtes-vous sûr(e) ?" 
            footerClass="event-item__modal-actions" 
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>Annuler</Button>
                    <Button danger onClick={confirmDeleteHandler}>Supprimer</Button>
                </React.Fragment>
				  }>
				<p>
				Êtes-vous certain(e) de vouloir supprimer cet événement de l'agenda ?
				Cette action entraînera la suppression irréversible de celui-ci !
				</p><br></br><br></br>
			</Modal>

            

            {auth.isLoggedIn && auth.role == "Admin" &&
            <a href={`/${school}/agenda/admin/ajouter-evenement-calendrier`}>
                <img className='red-plus-add-event' src='/svg/red-plus.svg'></img>
            </a>}

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}

            {!isLoading && loadedCalendar &&
            <Card className="global-calendar-Card-div">

                <h4 className="global-agenda-title">Agenda général</h4>

                <Calendar 
                    localizer={localizer}
                    events={loadedCalendar}
                    startAccessor="start"
                    endAccessor="end" 
                    defaultView="month"
                    style={{height: 550, margin: "50px"}}
                    messages={{
                        next: "Suivant",
                        previous: "Précédent",
                        today: "Aujourd'hui",
                        month: "Mois",
                        week: "Semaine",
                        day: "Jour",
                        time: "Heure",
                        event: "Événement",
                        allDay: "  -  ",
                    }}
                    toolbar={true}
                    culture='fr'
                    eventPropGetter={(event, start, end, isSelected) => ({
                        event,
                        start,
                        end,
                        isSelected,
                        style: { backgroundColor: start == end ? "#4FC3A1": "#324960",
                         color: "white"}
                    })}
                    onSelectEvent={onSelectEvent}
                />

            </Card>}

        </React.Fragment>
    )
}

export default GlobalCalendar;