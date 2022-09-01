const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const nodemailer = require('../nodemailer/nodemailer.announcements.config');

const Announcement = require('../models/announcement');
const Student =  require('../models/student');

// Get announcement by school by class (target)
const getAnnouncementByTarget = async (req, res, next) => {
    const school = req.params.school;
    const target = req.params.target;

    let announcements;
    let targettedAnnouncements;
    let globalAnnouncements;
    try {
        if (target != "global") {
            targettedAnnouncements = await Announcement.find({school: school}).where({target: target});
            globalAnnouncements = await Announcement.find({school: school}).where({target: "global"});
            announcements = globalAnnouncements.concat(targettedAnnouncements).sort(function (a, b) {
                var dateA = new Date(a.posteddate), dateB = new Date(b.posteddate)
                return dateB - dateA
            });
           
        }

        if (target == "global") {
            announcements = await Announcement.find({school: school}).where({target: "global"}).sort({posteddate: -1});
        }
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des annonces, veillez réessayer', 500);
        return next(error);
    }

    if (!announcements) {
        const error = new HttpError(
            'Impossible de trouver des annonces pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ announcements: announcements.map(announcements => announcements.toObject({ getters: true })) });
}

// Get Announcement by id
const getAnnouncementById = async (req, res, next) => {
    const announcementId = req.params.aid;

    let announcement;
    try {
        announcement = await Announcement.findById(announcementId);
    }
    catch(err) {
        const error = new HttpError("L'annonce n'a pas pu être trouvée", 500);
        return next(error);
    }

    if (!announcement) {
        const error = new HttpError('Aucune annonce avec cet id', 404);
        return next(error);
    }

    res.json({
        announcement: announcement.toObject({getters: true})
    });
}

// Post announcement
const createAnnouncement = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title, description, school, target, posteddate, teacherid } = req.body;

    const createdAnnouncement = new Announcement ({
        title, 
        description,
        school, 
        target, 
        posteddate,
        teacherid
    });

    try {
        await createdAnnouncement.save();
    }
    catch (err) {
        const error = new HttpError(
            'Création de l\'annonce ratée, veuillez réessayer', 500);
        return next(error);
    }

    if (target == "global") {
        let studentsofthisschool = await Student.find({school: school});
        studentsarray = [];
        studentsofthisschool.forEach(element => {
            studentsarray.push(element.email);
        });
    }
    else {

        let studentsofthisschoolandclass = await Student.find({school: school}).where({classyear: target});
        studentsarray = [];
        studentsofthisschoolandclass.forEach(element => {
            studentsarray.push(element.email);
        });
    }   
    
    nodemailer.sendAnnouncementEmail(
        studentsarray,
        createdAnnouncement.title,
        createdAnnouncement.school,
    );
    
   


    res.status(201).json({announcement: createdAnnouncement});
}

// Update Announcement
const updateAnnouncement = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title, description } = req.body;
    const announcementId = req.params.aid;

    let announcement;
    try {
        announcement = await Announcement.findById(announcementId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour de l\'annonce impossible', 500);
        return next(error);
    }

    announcement.title = title;
    announcement.description = description;
    

    try {
        await announcement.save();

    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour de l\'annonce impossible', 500);
        return next(error);
    }

    res.json({announcement: announcement.toObject({getters: true})});
}

// Delete Announcement
const deleteAnnouncement = async (req, res, next) => {
    const announcementId = req.params.aid;

    let announcement;
    try {
        announcement =  await Announcement.findById(announcementId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression de l\'annonce impossible', 500);
            return next(error);
    }


    try {
        await announcement.remove();
    }
    catch (err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression de l\'annonce impossible', 500);
            return next(error);
    }


    res.status(200).json({ message: 'Annonce supprimée' });
}

exports.getAnnouncementByTarget = getAnnouncementByTarget;
exports.getAnnouncementById = getAnnouncementById;
exports.createAnnouncement = createAnnouncement;
exports.updateAnnouncement = updateAnnouncement;
exports.deleteAnnouncement = deleteAnnouncement;
