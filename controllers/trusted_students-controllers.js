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

    res.json({ users: trustedstudents.map(trustedstudent => trustedstudent.toObject({ getters: true })) });
};

// Get trusted student by id
const getTrustedStudentById = async (req, res, next) => {
    const trustedstudentId = req.params.tsid;

    let trustedstudent;
    try {
        trustedstudent = await TrustedStudent.findById(trustedstudentId);
    }
    catch(err) {
        const error = new HttpError("L'utlisateur n'a pas pu être trouvé", 500);
        return next(error);
    }

    if(!trustedstudent) {
        const error = new HttpError('Aucun utilisateur trouvé avec cet id', 404);
        return next(error);
    }

    res.json({
        user: trustedstudent.toObject({getters: true})
    });
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

    let existingTrustedStudent
    try {
        existingTrustedStudent = await TrustedStudent.findOne({email: email})
        .where({name: createdTrustedStudent.name}).where({firstname: createdTrustedStudent.firstname})
    }
    catch(err) {
        const error = new HttpError (
            'Création du contact ratée, veillez réessayer.', 500);
        return next(error);
    }

    if (existingTrustedStudent) {
        const error = new HttpError(
            'Ce contact de confiance est déjà renseigné !', 422);
        return next(error);
    }

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
exports.getTrustedStudentById = getTrustedStudentById;
exports.createTrustedStudent = createTrustedStudent;
exports.updateTrustedStudent = updateTrustedStudent;
exports.deleteTrustedStudent = deleteTrustedStudent;