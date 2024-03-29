const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const fs = require('fs');
const path = require('path');

dotenv.config();

// Routes
const newsRoutes = require('./routes/news-routes');
const trustedStudentsRoutes = require('./routes/trusted_students-routes');
const trustedTeachersRoutes = require('./routes/trusted_teachers-routes');
const studentsRoutes = require('./routes/students-routes');
const teachersRoutes = require('./routes/teachers-routes');
const calendarRoutes = require('./routes/calendar-routes');
const documentsRoutes = require('./routes/documents-routes');
const outingsRoutes = require('./routes/outings-routes');
const annnouncementsRoutes = require('./routes/announcements-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json()); 

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/uploads/xlsx', express.static(path.join('uploads', 'xlsx')));

app.use('/uploads/files', express.static(path.join('uploads', 'files')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
  });

  
app.use('/api/news', newsRoutes);

app.use('/api/trusted-students', trustedStudentsRoutes);

app.use('/api/trusted-teachers', trustedTeachersRoutes);

app.use('/api/students', studentsRoutes);

app.use('/api/teachers', teachersRoutes);

app.use('/api/calendar', calendarRoutes);

app.use('/api/documents', documentsRoutes);

app.use('/api/outings', outingsRoutes);

app.use('/api/announcements', annnouncementsRoutes);


app.use((req , res, next ) => {
    const error = new HttpError('Route introuvable', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if(req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occurred'
    });
});

mongoose
.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kerju.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {
    app.listen(process.env.PORT || 5000);
})
.catch(err => {
    console.log(err);
});


module.exports = app;