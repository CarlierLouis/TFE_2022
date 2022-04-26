const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

const Teacher = require('../models/teacher');
const teacher = require('../models/teacher');


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
            'Création du compte ratée, veillez réessayer', 500);
        return next(error);
    }

    if (existingTeacher) {
        const error = new HttpError(
            'Email déjà utilisé, veillez réesser avec un autre email', 422);
        return next(error);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch(err) {
        const error = new HttpError('Le compte n\'a pas pu être créé, veillez réessayer plus tard.', 500);
        return next(error);
    }


    const createdTeacher = new Teacher ({
        email,
        name,
        firstname, 
        password: hashedPassword,
        school
    });

    try {
        await createdTeacher.save();
    }
    catch(err) {
        const error = new HttpError(
            'Création du compte ratée, veillez réessayer plus tard.', 500);
        return next(error);
    } 

    let token;
    try {
    token = jwt.sign({teacherId: createdTeacher.id, email: createdTeacher.email},
        'supersecret_dont_share',
        {expiresIn: '1h'}
    );
    }
    catch(err) {
        const error = new HttpError(
            'Création du compte ratée, veillez réessayer plus tard.', 500);
        return next(error);
    }

    res.status(201).json({ 
        teacherId: createdTeacher.id,
         email: createdTeacher.email,
          token: token }
    );
};


// Teachers Login
const login = async (req, res, next) => {
    const { email, password } = req.body;

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

    let token;
    try {
    token = jwt.sign({teacherId: existingTeacher.id, email: existingTeacher.email},
        'supersecret_dont_share',
        {expiresIn: '1h'}
    );
    }
    catch(err) {
        const error = new HttpError(
            'Conexion ratée, veillez réessayer plus tard.', 500);
        return next(error);
    }

    res.json({ 
        teacherId: existingTeacher.id,
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

exports.signup = signup;
exports.login = login;
exports.getTeachers = getTeachers;
exports.updateTeacher = updateTeacher;
exports.deleteTeacher = deleteTeacher;