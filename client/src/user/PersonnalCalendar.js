import React, { useState, useEffect, useContext, useCallback } from "react";

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

import './PersonnalCalendar.css';
import '../teachers/PersonnalCalendar/PersonnalCalendar.css';

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

const PersonnalCalendar = props => {
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
    const [loadedEventTarget, setLoadedEventTarget] = useState();


    useEffect(() => {
        const fetchcalendar = async () => {
            const events = [];
            try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/api/calendar/${school}/target/${props.classyear}`, 'GET', null,
            {Authorization: 'Bearer ' + auth.token});

            responseData.events.forEach(element => {
                const event = {
                    id: element.id,
                    allDay: true,
                    title: element.title,
                    start: element.start,
                    end: element.end,
                    target: element.target
                }

                events.push(event);

            });

            setLoadedCalendar(events);

            }
            catch(err) {}
        };
        fetchcalendar();
    }, [sendRequest]);
     

    const closeMoreHandler = () => {
        setShowMore(false);
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
  
  
      const refreshPage = () => {
          window.location.reload(true);
      }

    const onSelectEvent = useCallback((calEvent) => {
        setShowMore(true);
        setLoadedEventId(calEvent.id);
        setLoadedEventTitle(calEvent.title);
        setLoadedEventStart(calEvent.start.toString().substring(0, 10));
        setLoadedEventEnd(calEvent.end.toString().substring(0, 10));
        setLoadedEventTarget(calEvent.target);
      });


    return (
        <React.Fragment>
             <ErrorModal error={error} onClear={clearError} />

            
            <Modal
            show={showMore}
            onCancel={closeMoreHandler}
            footer={<Button onClick={closeMoreHandler}>Fermer</Button>}>

            {(auth.role == "Default" || auth.role == "Admin") && loadedEventTarget != "global" && 
            <a href={`/${school}/espace-prof/horaires/maj-evenement-calendrier`}>
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
                    </div>

                {(auth.role == "Default" || auth.role == "Admin") && loadedEventTarget != "global" && 
                <img onClick={showDeleteWarningHandler} className="event-delete" src="/svg/delete-red.svg"/>}
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
				Êtes-vous certain(e) de vouloir supprimer cet événement de l'agenda des <b>{props.classyear}</b> ?
				Cette action entraînera la suppression irréversible de celui-ci !
				</p><br></br><br></br>
			</Modal>


            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}


            {!isLoading && loadedCalendar &&
            <Card className="personnal-calendar-Card-div">

                {(auth.role == "Default" || auth.role == "Admin") &&
                <a href={`/${school}/espace-prof/horaires/${props.classyear}/ajouter-evenement-calendrier`}>
                    <img className='red-plus-add-targeted-event' src='/svg/red-plus.svg'></img>
                </a>}
                
                {(auth.role == "Default" || auth.role == "Admin") &&
                <div>
                    <h4 className="calendar-class-title">Classe: {props.classyear}</h4>
                    <h5 className="calendar-change-class">
                        <a href={"/" + school + "/espace-prof" + "/horaires"}>Changer de classe</a>
                    </h5>
                   
                </div>}

                
                <div className="personnal-calendar-div">
                    <Calendar 
                        localizer={localizer}
                        events={loadedCalendar}
                        startAccessor="start"
                        endAccessor="end" 
                        defaultView="agenda"
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
                            noEventsInRange: "Pas d'événement prévu durant cette période"
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
                </div>

            </Card>}


        </React.Fragment>
    )
}

export default PersonnalCalendar;