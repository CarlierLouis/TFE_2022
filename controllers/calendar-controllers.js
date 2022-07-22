const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const CalendarEvent =  require('../models/calendar-event');

// Get all events from global calendar by school
const getGlobalEvents = async (req, res, next) => {
    const school =  req.params.school;

    let events;
    try {
        events = await CalendarEvent.find({school: school}).where({target: "global"})
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération du calendrier, veillez réessayer', 500);
        return next(error);
    }

    if(!events) {
        const error = new HttpError(
            'Impossible de trouver des événements pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ events: events.map(events => events.toObject({ getters: true })) });
}


// Get events by school and by class (target => global + specific class)
const getEventsByTarget = async (req, res, next) => {
    const school = req.params.school;
    const target = req.params.target;

    let events;
    let globalEvents;
    let targetEvents;
    try {
        globalEvents = await CalendarEvent.find({school: school}).where({target: "global"});
        targetEvents =  await CalendarEvent.find({school: school}).where({target: target});
        events = globalEvents.concat(targetEvents);
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération du calendrier, veillez réessayer', 500);
        return next(error);
    }

    if(!events) {
        const error = new HttpError(
            'Impossible de trouver des événements pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ events: events.map(events => events.toObject({ getters: true })) });
}


// Get Event by id
const getEventById = async (req, res, next) => {
    const eventId = req.params.eid;

    let event;
    try {
        event = await CalendarEvent.findById(eventId);
    }
    catch(err) {
        const error = new HttpError("L'événement n'a pas pu être trouvée", 500);
        return next(error);
    }

    if(!event) {
        const error = new HttpError('Aucun événement trouvée avec cet id', 404);
        return next(error);
    }

    res.json({
        event: event.toObject({getters: true})
    });
}


// Post Event for calendar
const createEvent = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title, start, end, school, target } = req.body;

    const createdEvent = new CalendarEvent ({
        title,   
        start,
        end,
        school,
        target
    });

    try {
        await createdEvent.save();
    } 
    catch(err) {
        const error = new HttpError(
            'Création du nouvel événement pour le calendrier raté, veillez réessayer', 500);
        return next(error);
    }

    res.status(201).json({event: createdEvent});
}

// Update Event
const updateEvent = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title, start, end }  = req.body;
    const eventId = req.params.eid;

    let event;
    try {
        event = await CalendarEvent.findById(eventId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour de l\'événement du calendrier impossible', 500);
        return next(error);
    }

    event.title = title;
    event.start = start;
    event.end = end;

    try {
        await event.save();
    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour de l\'événement du calendrier impossible', 500);
        return next(error);
    }

    res.json({event: event.toObject({getters: true})});
}

// Delete Event
const deleteEvent =  async (req, res, next) => {
    const eventId = req.params.eid;

    let event;
    try {
        event = await CalendarEvent.findById(eventId);
    }
    catch (err) {
        const error = new HttpError(
        'Quelque chose ne s\'est pas passé comme prévu, suppression de l\'événement impossible', 500);
        return next(error);
    }

    try {
        await event.remove();
    } 
    catch (err) {
        const error = new HttpError(
        'Quelque chose ne s\'est pas passé comme prévu, suppression de l\'événement impossible', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Événement supprimé' });
}

exports.getGlobalEvents = getGlobalEvents;
exports.getEventsByTarget = getEventsByTarget;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;


