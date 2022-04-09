const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Routes
const newsRoutes = require('./routes/news-routes');
const trustedStudentsRoutes = require('./routes/trusted_students-routes');
const trustedTeachersRoutes = require('./routes/trusted_teachers-routes');
const studentsRoutes = require('./routes/students-routes');
const teachersRoutes = require('./routes/teachers-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json()); 

app.use('/api/news', newsRoutes);

app.use('/api/trusted/students', trustedStudentsRoutes);

app.use('/api/trusted/teachers', trustedTeachersRoutes);

app.use('/api/students', studentsRoutes);

app.use('/api/teachers', teachersRoutes);


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


mongoose
.connect(`mongodb+srv://louis:${process.env.DB_PASSWORD}@cluster0.kerju.mongodb.net/schoolsdb?retryWrites=true&w=majority`)
.then(() => {
    app.listen(5000);
})
.catch(err => {
    console.log(err);
});