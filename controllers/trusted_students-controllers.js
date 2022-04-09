const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const TrustedStudent = require('../models/trusted_student');

// Get all trusted students by school
const getTrustedStudents = async (req, res, next) => {
    const school = req.params.school;

    let trustedstudents;
    try {
        trustedstudents =  await TrustedStudent.find({school: school})
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des contacts "élèves de confiance", veillez réessayer', 500);
        return next(error);
    }
    if (!trustedstudents) {
        const error = new HttpError(
            'Impossible de trouver des contacts "élèves de confiance" pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ trustedstudents: trustedstudents.map(trustedstudent => trustedstudent.toObject({ getters: true })) });
};

// Post Trusted Student
const createTrustedStudent = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { email, name, firstname, classyear, school } = req.body;

    const createdTrustedStudent =  new TrustedStudent ({
        email,
        name,
        firstname,
        classyear,
        school
    });

    try {
        await createdTrustedStudent.save();
    }
    catch(err) {
        const error = new HttpError(
            'Création du nouveau contact "élève de confiance" ratée, veillez réessayer', 500);
        return next(error);
    }
    
    res.status(201).json({ trustedstudent: createdTrustedStudent });
};

// Update Trusted Student
const updateTrustedStudent = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { email, classyear } =  req.body;
    const trustedStudentId = req.params.tsid;

    let trustedstudent;
    try {
        trustedstudent= await TrustedStudent.findById(trustedStudentId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du contact "élève de confiance" impossible', 500);
        return next(error);
    }
    
    trustedstudent.email = email;
    trustedstudent.classyear = classyear;

    try {
        await trustedstudent.save();
    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du contact "élève de confiance" impossible', 500);
        return next(error);
    }

    res.json({trustedstudent: trustedstudent.toObject({getters: true})})
}

// Delete Trusted Student
const deleteTrustedStudent = async (req, res, next) => {
    const trustedStudentId = req.params.tsid;

    let trustedstudent;
    try {
        trustedstudent= await TrustedStudent.findById(trustedStudentId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du contact "élève de confiance" impossible', 500);
        return next(error);
    }

    try {
        await trustedstudent.remove();
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du contact "élève de confiance" impossible', 500);
            return next(error);
    }

    res.status(200).json({ message: 'Contact "élève de confiance" supprimé' })
}

exports.getTrustedStudents = getTrustedStudents;
exports.createTrustedStudent = createTrustedStudent;
exports.updateTrustedStudent = updateTrustedStudent;
exports.deleteTrustedStudent = deleteTrustedStudent;