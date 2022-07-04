import React, { useState } from "react";

import MainNavigation from '../common/navigation/MainNavigation';
import { useParams } from "react-router-dom";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from 'react-datepicker'
import "react-big-calendar/lib/css/react-big-calendar.css";

import './GlobalCalendar.css';

const locales = {
    "fr": require("date-fns/locale/fr")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const events = [
    {
        title: "Grandes Vacances",
        allDay: true,
        start: new Date(2022,6,20),
        end: new Date(2022,6,25)
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

            <h1>Agenda</h1>

            <Calendar 
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end" 
                style={{height: 500, margin: "50px"}} 
            />

            <br></br>

        </React.Fragment>
    )
}

export default GlobalCalendar;