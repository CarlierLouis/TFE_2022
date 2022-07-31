const fs = require('fs');

const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const Document = require('../models/document');

// Get document by school by class (target)
const getDocumentsByTarget = async (req, res, next) => {
    const school = req.params.school;
    const target = req.params.target;

    let documents;
    let targettedDocuments;
    let globalDocuments;
    try {
        if (target != "global") {
        targettedDocuments = await Document.find({school: school}).where({target: target});
        globalDocuments = await Document.find({school: school}).where({target: "global"});
        documents = globalDocuments.concat(targettedDocuments)};

        if (target == "global") {
            documents = await Document.find({school: school}).where({target: "global"});
        }
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des documents, veillez réessayer', 500);
        return next(error);
    }

    if (!documents) {
        const error = new HttpError(
            'Impossible de trouver des documents pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ documents: documents.map(documents => documents.toObject({ getters: true })) });
}

// Get Document by id
const getDocumentsById = async (req, res, next) => {
    const documentId =  req.params.did;

    let document;
    try {
        document = await Document.findById(documentId)
    }
    catch(err) {
        const error = new HttpError("Le document n'a pas pu être trouvé", 500);
        return next(error);
    }

    if (!document) {
        const error = new HttpError('Aucun document trouvé avec cet id', 404);
        return next(error);
    }

    res.json({
        document: document.toObject({getters: true})
    });
}

// Post Document 
const createDocument = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title, school, target } = req.body;

    const createdDocument = new Document ({
        title,
        school, 
        target, 
        file: req.file.path
    });

    try {
        await createdDocument.save();
    }
    catch(err) {
        const error = new HttpError(
            'Création du nouveau document raté, veillez réessayer', 500);
        return next(error);
    }

    res.status(201).json({document: createdDocument});
}

// Update Document
const updateDocument = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title } = req.body;
    const documentId = req.params.did;

    let document;
    try {
        document = await Document.findById(documentId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du document impossible', 500);
        return next(error);
    }

    const oldFilePath = document.file;

    document.title = title;

    if (req.file != undefined) {
        document.file = req.file.path;
    }



    try {
        await document.save();

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
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du document impossible', 500);
        return next(error);
    }

    res.json({document: document.toObject({getters: true})});
}

// Delete Document 
const deleteDocument = async (req, res, next) => {
    const documentId = req.params.did;

    let document;
    try {
        document = await Document.findById(documentId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du document impossible', 500);
            return next(error);
    }

    const filePath = document.file;

    try {
        await document.remove();
    }
    catch (err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du document impossible', 500);
            return next(error);
    }


    /*
    
    fs.unlink(filePath, err => {
        console.log(err);
    });

    */
    


    res.status(200).json({ message: 'Document supprimée' });
}


exports.getDocumentsByTarget = getDocumentsByTarget;
exports.getDocumentsById = getDocumentsById;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;