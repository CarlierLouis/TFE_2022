import React, { useState, useEffect, useContext } from "react";

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
    const [loadedEvents, setLoadedEvents] = useState();

    useEffect(() => {
        const fetchcalendar = async () => {
            const events = [];
            try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/api/calendar/${school}`, 'GET', null,
            {Authorization: 'Bearer ' + auth.token});

            responseData.events.forEach(element => {
                const event = {
                    allDay: true,
                    title: element.title,
                    start: element.start,
                    end: element.end
                }

                events.push(event);

                setLoadedEvents(responseData.events);
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

    const openMoreHandler = () => {
        setShowMore(true);
      };
    
    const closeMoreHandler = () => {
      setShowMore(false);
      };

      const confirmDeleteHandler = async () => {
		setShowConfirmModal(false);
		try {
			await sendRequest(
				process.env.REACT_APP_BACKEND_URL + `/api/calendar/${props.id}`,
				'DELETE',
				null,
				{Authorization: 'Bearer ' + auth.token}
			);
			props.onDelete(props.id);
		}
		catch(err) {}

    if (!error) {
    refreshPage();
    }
	};

    const refreshPage = () =>{
        window.location.reload(true);
    }


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
            
            {loadedCalendar != undefined && 
            <h1>{loadedEvents[1].id}</h1>}
            </Modal>

            

            {auth.isLoggedIn && auth.role == "Admin" && window.location.pathname != `/${school}` &&
            <a href={`/${school}/admin/ajouter-evenement-calendrier`}>
                <img className='red-plus-add-event' src='/svg/red-plus.svg'></img>
            </a>}

            {isLoading && 
            <div className='center'>
                <LoadingSpinner />
            </div>}

            <Card className="global-calendar-Card-div">

                <h2 className="global-agenda-title">Agenda général</h2>

                
                {!isLoading && loadedCalendar &&
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
                    onSelectEvent={openMoreHandler}
                />}

            </Card>

        </React.Fragment>
    )
}

export default GlobalCalendar;