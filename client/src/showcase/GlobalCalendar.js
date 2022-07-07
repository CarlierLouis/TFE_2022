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

import './GlobalCalendar.css';

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

    
    useEffect(() => {
        const fetchcalendar = async () => {
            try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/api/calendar/${school}`, 'GET', null,
            {Authorization: 'Bearer ' + auth.token});
            setLoadedCalendar(responseData.events);
            }
            catch(err) {}
        };
        fetchcalendar();
    }, [sendRequest]);


    return(
        <React.Fragment>
            {school == "grand-hallet" && 
                <MainNavigation schoolLink="grand-hallet"
                                schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="/svg/Moxhe_blanc.svg" />}
           
            <ErrorModal error={error} onClear={clearError} />

            <Card className="global-calendar-Card-div">

                <h2 className="global-agenda-title">Agenda général</h2>
                
                {isLoading && 
                <div className='center'>
                    <LoadingSpinner />
                </div>}
                
                {!isLoading && 
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
                        allDay: "  -  "
                    }}
                    toolbar={true}
                    culture='fr'
                />}

            </Card>

        </React.Fragment>
    )
}

export default GlobalCalendar;