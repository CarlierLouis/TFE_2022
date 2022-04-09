const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const TrustedTeacher = require('../models/trusted_teacher');

// Get all trusted teachers by school
const getTrustedTeachers = async (req, res, next) => {
    const school = req.params.school;

    let trustedteachers;
    try {
        trustedteachers =  await TrustedTeacher.find({school: school})
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des contact "professeurs de confiance", veillez réessayer', 500);
        return next(error);
    }
    if (!trustedteachers) {
        const error = new HttpError(
            'Impossible de trouver des contact "professeurs de confiance" pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ trustedteachers: trustedteachers.map(trustedeacher => trustedeacher.toObject({ getters: true })) });
};

// Post Trusted Teacher
const createTrustedTeacher = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { email, name, firstname, school } = req.body;

    const createdTrustedTeacher =  new TrustedTeacher ({
        email,
        name,
        firstname,
        school
    });

    try {
        await createdTrustedTeacher.save();
    }
    catch(err) {
        const error = new HttpError(
            'Création du nouveau contact "professeur de confiance" ratée, veillez réessayer', 500);
        return next(error);
    }
    
    res.status(201).json({trustedteachers: createdTrustedTeacher});
};

// Update Trusted Teacher
const updateTrustedTeacher = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { email } =  req.body;
    const trustedTeacherId = req.params.tsid;

    let trustedteacher;
    try {
        trustedteacher = await TrustedTeacher.findById(trustedTeacherId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du contact "professeur de confiance" impossible', 500);
        return next(error);
    }

    trustedteacher.email = email;

    try {
        await trustedteacher.save();
    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du contact "professeur de confiance" impossible', 500);
        return next(error);
    }

    res.json({trustedteacher: trustedteacher.toObject({getters: true})})
}

// Delete Trusted Teacher
const deleteTrustedTeacher = async (req, res, next) => {
    const trustedTeacherId = req.params.tsid;

    let trustedteacher;
    try {
        trustedteacher = await TrustedTeacher.findById(trustedTeacherId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du contact "professeur de confiance" impossible', 500);
        return next(error);
    }

    try {
        await trustedteacher.remove();
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du contact "professeur de confiance" impossible', 500);
            return next(error);
    }

    res.status(200).json({ message: 'Contact "professeur de confiance" supprimé' })
}

exports.getTrustedTeachers= getTrustedTeachers;
exports.createTrustedTeacher= createTrustedTeacher;
exports.updateTrustedTeacher = updateTrustedTeacher;
exports.deleteTrustedTeacher = deleteTrustedTeacher;