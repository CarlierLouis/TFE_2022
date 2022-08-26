const fs = require('fs');

const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const News = require('../models/news');

const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  })


// Get all News by school
const getNews = async (req, res, next) => {
    const school = req.params.school;

    let news;
    try {
        news = await News.find({school: school})
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des actualités, veuillez réessayer', 500);
        return next(error);
    }

    if(!news) {
        const error = new HttpError(
            'Impossible de trouver des actualités pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ news: news.map(news => news.toObject({ getters: true })).reverse() });
};

// Get News by id
const getNewsById = async (req, res, next) => {
    const newsId = req.params.nid;

    let news;
    try {
        news = await News.findById(newsId);
    }
    catch(err) {
        const error = new HttpError("L'actualité n'a pas pu être trouvée", 500);
        return next(error);
    }

    if(!news) {
        const error = new HttpError('Aucune actualité trouvée avec cet id', 404);
        return next(error);
    }

    res.json({
        news: news.toObject({getters: true})
    });
};

// Post News
const createNews = async(req, res, next) => {
    // express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { title, description, date, school }  = req.body;

    const createdNews = new News ({
        title,   
        description,
        date,
        school,
        image: req.file.filename
    });


  

    try {
        await createdNews.save();
        s3.upload({
            Bucket: `${process.env.AWS_S3_BUCKET_NAME}/images`,
            Key: req.file.filename,
            Body: fs.readFileSync(req.file.path),
          }).promise();
    } 
    catch(err) {
        const error = new HttpError(
            'Création de la nouvelle actualité raté, veuillez réessayer', 500);
        return next(error);
    }

    res.status(201).json({news: createdNews});
};

// Update News
const updateNews = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }
    
    const { title, description, date } = req.body;
    const newsId = req.params.nid;

    let news;
    try {
        news = await News.findById(newsId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour de l\'actualité impossible', 500);
        return next(error);
    }

    const oldImagePath = news.image;

    news.title = title;
    news.description = description;
    news.date = date;

    if (req.file != undefined) {
        news.image = req.file.filename;
    }


    try {
        await news.save();

        if (req.file != undefined) {
            /*
            fs.unlink(oldImagePath, err => {
                console.log(err);
            });
            */

        s3.deleteObject({
            Bucket: `${process.env.AWS_S3_BUCKET_NAME}/images`,
            Key: oldImagePath,
        }).promise();

        s3.upload({
            Bucket: `${process.env.AWS_S3_BUCKET_NAME}/images`,
            Key: req.file.filename,
            Body: fs.readFileSync(req.file.path),
          }).promise();
    }

    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour de l\'actualité impossible', 500);
        return next(error);
    }

    res.json({news: news.toObject({getters: true})});
};

// Delete News
const deleteNews =  async (req, res, next) => {
    const newsId = req.params.nid;

    let news;
    try {
        news = await News.findById(newsId);
    }
    catch (err) {
        const error = new HttpError(
        'Quelque chose ne s\'est pas passé comme prévu, suppression de l\'actualité impossible', 500);
        return next(error);
    }

    const imagePath = news.image;

    try {
        await news.remove();
    } 
    catch (err) {
        const error = new HttpError(
        'Quelque chose ne s\'est pas passé comme prévu, suppression de l\'actualité impossible', 500);
        return next(error);
    }

    s3.deleteObject({
        Bucket: `${process.env.AWS_S3_BUCKET_NAME}/images`,
        Key: imagePath,
      }).promise();

      /*
    fs.unlink(imagePath, err => {
        console.log(err);
    });
    */

    res.status(200).json({ message: 'Actualité supprimée' });
}

exports.getNews = getNews;
exports.getNewsById = getNewsById;
exports.createNews = createNews;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;
