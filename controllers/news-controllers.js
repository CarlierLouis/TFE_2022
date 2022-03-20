const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const { restart } = require('nodemon');

const HttpError = require('../models/http-error');
const News = require('../models/news');

let DUMMY_DATA = [
    {
        id: 'uniqueID1',
        exemple1: 'dummy1',
        exemple2: 'dummy2'
    } 
];

const getNews = (req, res, next) => {
    const news = DUMMY_DATA;

    // Exemple de "GetNewsById"
    /* 
    const newsId = req.params.id;

    =====> Ici l'id est unique et ne retourne que une news 
    mais si on veut retourner de multiples éléments, on utilisera "filter" au lieu de "find"

    const news = DUMMY_DATA.find(p => {
        return p.id === newsId;
    })
    =====> alors la route est router.get('/:id', newsControllers.GetNewsById);
    
    if (!news || news.length === 0) {
        throw new HttpError('Aucune actualié trouvée', 404);
    }

    res.json({ news });
    */

    res.json({ news });
};

const createNews = async(req, res, next) => {
    // express-validator
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Entrées non valides, vérifiez vos données', 422)
    }

    const { exemple1, exemple2 }  = req.body;

    const createdNews = new News ({
        exemple1,   
        exemple2
    });

    try {
        await createdNews.save();
    } 
    catch (err) {
        const error = HttpError('Création de la nouvelle actualité raté, veillez réessayer', 500);
        return next(error);
    }
    res.status(201).json({news: createdNews});
};

exports.getNews = getNews;
exports.createNews = createNews;