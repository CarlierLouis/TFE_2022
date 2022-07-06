import React, { useState } from "react";

import MainNavigation from '../common/navigation/MainNavigation';
import { useParams } from "react-router-dom";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import fr from "date-fns/locale/fr";
import Card from "../common/UIElements/Card";

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


const events = [
    {
        allDay: true,
        title: "Fancy Fair",
        start: new Date(2022,6,6),
        end: new Date(2022,6,6)
    }
]


const GlobalCalendar = props => {
    const school = useParams().school;

    return(
        <React.Fragment>
            {school == "grand-hallet" && 
                <MainNavigation schoolLink="grand-hallet"
                                schoolLogo="/svg/Grand-Hallet_blanc.svg" />}

            {school == "moxhe" && 
            <MainNavigation schoolLink="moxhe"
                            schoolLogo="/svg/Moxhe_blanc.svg" />}
           

            <Card className="global-calendar-Card-div">

                <h2 className="global-agenda-title">Agenda général</h2>
                
                <Calendar 
                    localizer={localizer}
                    events={events}
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
                />
            </Card>

        </React.Fragment>
    )
}

export default GlobalCalendar;