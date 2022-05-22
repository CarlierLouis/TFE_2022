const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

const nodemailer = require('../nodemailer/nodemailer.config');

const Teacher = require('../models/teacher');
const TrustedTeacher = require('../models/trusted_teacher');


// Teachers Signup
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next (
            new HttpError('Entrées non valides, vérifiez vos données', 422)
        );
    }

    const { email, name, firstname, password, school } = req.body;

    let existingTeacher
    try {
        existingTeacher = await Teacher.findOne({email: email})
    }
    catch(err) {
        const error = new HttpError (
            'Création du compte ratée, veillez réessayer.', 500);
        return next(error);
    }

    if (existingTeacher) {
        const error = new HttpError(
            'Email déjà utilisé, veillez réesser avec un autre email.', 422);
        return next(error);
    }

    let existingTrustedTeacher
    try {
        existingTrustedTeacher = await TrustedTeacher.findOne({email: email})
    }
    catch(err) {
        const error = new HttpError (
            'Création du compte ratée, veillez réessayer.', 500);
        return next(error);
    }

    if (!existingTrustedTeacher) {
        const error = new HttpError(
            'Vous ne pouvez pas créer de compte avec cette addresse email !', 422);
        return next(error);
    }
    
    if (existingTrustedTeacher.school != school) {
        const error = new HttpError(
            'Vous ne pouvez pas vous créer de compte dans cette école !', 401)
        return next(error);
    };


    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch(err) {
        const error = new HttpError('Le compte n\'a pas pu être créé, veillez réessayer plus tard.', 500);
        return next(error);
    }

    // email conformation 
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let emailConfirmationToken = '';
    for (let i = 0; i < 25; i++) {
        emailConfirmationToken += characters[Math.floor(Math.random() * characters.length )];
    }

    const createdTeacher = new Teacher ({
        email,
        name,
        firstname, 
        password: hashedPassword,
        school,
        confirmationCode: emailConfirmationToken
    });

    try {
        await createdTeacher.save();
    }
    catch(err) {
        const error = new HttpError(
            'Création du compte ratée, veillez réessayer plus tard.', 500);
        return next(error);
    }

    nodemailer.sendConfirmationEmail(
        createdTeacher.firstname,
        createdTeacher.email,
        "teachers",
        createdTeacher.confirmationCode
    );


    let token;
    try {
    token = jwt.sign({userId: createdTeacher.id, email: createdTeacher.email},
        process.env.TOKENKEY_TEACHER,
        {expiresIn: '1h'}
    );
    }
    catch(err) {
        const error = new HttpError(
            'Création du compte ratée, veillez réessayer plus tard.', 500);
        return next(error);
    }

    res.status(201).json({ 
        userId: createdTeacher.id,
        email: createdTeacher.email,
        token: token }
    );
};


// Teachers Login
const login = async (req, res, next) => {
    const { email, password, school } = req.body;

    let existingTeacher;
    try {
        existingTeacher = await Teacher.findOne({email: email})
    }
    catch (err) {
        const error = new HttpError(
            'Connexion ratée, veillez réessayer', 500);
        return next(error);
    }

    if (!existingTeacher) {
        const error = new HttpError(
            'Identifiants invalides, connexion impossible', 401)
        return next(error);
    };

    if (existingTeacher.school != school) {
        const error = new HttpError(
            'Identifiants invalides, connexion impossible', 401)
        return next(error);
    };

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingTeacher.password);
    }
    catch(err) {
        const error = new HttpError(
            'Vous ne pouvez pas vous connecter, veillez vérifier vos identfiants et réessayer.', 500)
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Identifiants invalides, connexion impossible', 401)
        return next(error);
    }

    if (existingTeacher.status != "Active") {
        const error = new HttpError(
           'Création du compte en attente. Vérifiez vos emails !', 401)
        return next(error);
    };


    let token;
    try {
        if (existingTeacher.role == "Admin") {
            token = jwt.sign({userId: existingTeacher.id, email: existingTeacher.email},
                process.env.TOKENKEY_ADMIN,
                {expiresIn: '1h'}
            ); 
        }
        else {
        token = jwt.sign({userId: existingTeacher.id, email: existingTeacher.email},
            process.env.TOKENKEY_TEACHER,
            {expiresIn: '1h'}
    );
        }
    }
    catch(err) {
        const error = new HttpError(
            'Conexion ratée, veillez réessayer plus tard.', 500);
        return next(error);
    }

    res.json({ 
        userId: existingTeacher.id,
        email: existingTeacher.email,
        token: token
     });
}


// Get all teachers by school 
const getTeachers = async (req, res, next) => {
    const school = req.params.school;

    let teachers;
    try {
        teachers =  await Teacher.find({school: school}, '-password')
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des professeurs, veillez réessayer', 500);
        return next(error);
    }
    if (!teachers) {
        const error = new HttpError(
            'Impossible de trouver des professeurs pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ teachers: teachers.map(teacher => teacher.toObject({ getters: true})) });
}

// Update Teacher
const updateTeacher = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { email, password, role} =  req.body;
    const teacherId = req.params.tid;

    let teacher;
    try {
        teacher= await Teacher.findById(teacherId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du compte impossible', 500);
        return next(error);
    }
    
    teacher.email = email;
    teacher.password = password;
    teacher.role = role;

    try {
        await teacher.save();
    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du compte impossible', 500);
        return next(error);
    }

    res.json({teacher: teacher.toObject({getters: true})})
}

// Delete Teacher
const deleteTeacher = async (req, res, next) => {
    const teacherId = req.params.tid;

    let teacher;
    try {
        teacher = await Teacher.findById(teacherId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du compte impossible', 500);
        return next(error);
    }

    try {
        await teacher.remove();
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du compte impossible', 500);
            return next(error);
    }

    res.status(200).json({ message: 'Compte supprimé' })
}


const verifyEmail = async (req, res, next) => {
   const confirmationCode = req.params.code;

   let teacher;
    try {
        teacher = await Teacher.findOne({confirmationCode: confirmationCode});
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu', 500);
        return next(error);
    }
    if (!teacher) {
        const error = new HttpError(
            'utlisateur non trouvé !', 404);
        return next(error);
    }

    teacher.status = "Active";

    try {
        await teacher.save();
    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu', 500);
        return next(error);
    }

    res.json({teacher: teacher.toObject({getters: true})})

};

exports.signup = signup;
exports.login = login;
exports.getTeachers = getTeachers;
exports.updateTeacher = updateTeacher;
exports.deleteTeacher = deleteTeacher;
exports.verifyEmail = verifyEmail;