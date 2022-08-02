const fs = require('fs');

const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const Outing = require('../models/outing');

// Get outing by school by class (target)
const getOutingByTarget = async (req, res, next) => {
    const school = req.params.school;
    const target = req.params.target;

    let outings;
    try {
        outings = await Outing.find({school: school}).where({target: target});
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des sorties scolaires, veillez réessayer', 500);
        return next(error);
    }

    if (!outings) {
        const error = new HttpError(
            'Impossible de trouver des sorties scolaires pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ outings: outings.map(outings => outings.toObject({ getters: true })) });
}

// Get Outing by id 
const getOutingById = async (req, res, next) => {
    const outingId = req.params.oid;

    let outing;
    try {
        outing = await Outing.findById(outingId);
    }
    catch(err) {
        const error = new HttpError("La sortie scolaire n'a pas pu être trouvée", 500);
        return next(error);
    }

    if (!outing) {
        const error = new HttpError('Aucune sortie scolaire trouvée avec cet id', 404);
        return next(error);
    }

    res.json({
        outing: outing.toObject({getters: true})
    });
}

// Post Outing
const createOuting = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title, school, target, start, end } = req.body;

    const createdOuting = new Outing ({
        title, 
        school, 
        target, 
        start, 
        end,
        file: req.file.path
    });

    try {
        await createdOuting.save();
    }
    catch (err) {
        const error = new HttpError(
            'Création de la nouvelle sortie scolaire ratée, veillez réessayer', 500);
        return next(error);
    }

    res.status(201).json({outing: createdOuting});
}

// Update Outing
const updateOuting = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title, start, end } = req.body;
    const outingId = req.params.oid;

    let outing;
    try {
        outing = await Outing.findById(outingId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour de la sortie scolaire impossible', 500);
        return next(error);
    }

    const oldFilePath = outing.file;

    outing.title = title;
    outing.start = start;
    outing.end = end;
    
    if (req.file != undefined) {
        outing.file = req.file.path;
    }

    try {
        await outing.save();

        /*
        if (req.file != undefined) {
            fs.unlink(oldFilePath, err => {
                console.log(err);
        });
    }
    */

    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour de la sortie scolaire impossible', 500);
        return next(error);
    }

    res.json({outing: outing.toObject({getters: true})});
}

// Delete Outing
const deleteOuting = async (req, res, next) => {
    const outingId = req.params.oid;

    let outing;
    try {
        outing =  await Outing.findById(outingId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression de la sortie scolaire impossible', 500);
            return next(error);
    }

    const filePath = outing.file;

    try {
        await outing.remove();
    }
    catch (err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression de la sortie scolaire impossible', 500);
            return next(error);
    }

    /*
    
    fs.unlink(filePath, err => {
        console.log(err);
    });

    */


    res.status(200).json({ message: 'Sortie scolaire supprimée' });
}


exports.getOutingByTarget = getOutingByTarget;
exports.getOutingById = getOutingById;
exports.createOuting = createOuting;
exports.updateOuting = updateOuting;
exports.deleteOuting = deleteOuting;