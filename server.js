const express = require('express')
const bodyParser = require('body-parser');

const newsRoutes = require('./routes/news-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/news', newsRoutes);

app.use((req , res, next ) => {
    const error = new HttpError('Route introuvable', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || "Une erreur inconnue s'est produite"});
});

app.listen(5000);