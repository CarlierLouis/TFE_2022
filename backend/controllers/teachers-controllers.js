const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

const nodemailer = require('../nodemailer/nodemailer.config');
const nodemailer2 = require('../nodemailer/nodemailer.config2');

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
            'Création du compte ratée, veuillez réessayer.', 500);
        return next(error);
    }

    if (existingTeacher && existingTeacher.status == "Active") {
        const error = new HttpError(
            'Email déjà utilisé, veuillez réesser avec un autre email.', 422);
        return next(error);
    }

    if (existingTeacher && existingTeacher.status != "Active") {
        existingTeacher.remove();
    }

    let existingTrustedTeacher
    try {
        existingTrustedTeacher = await TrustedTeacher.findOne({email: email})
    }
    catch(err) {
        const error = new HttpError (
            'Création du compte ratée, veuillez réessayer.', 500);
        return next(error);
    }

    if (!existingTrustedTeacher) {
        const error = new HttpError(
            'Vous ne pouvez pas créer de compte avec cette adresse email !', 422);
        return next(error);
    }
    
    if (existingTrustedTeacher.school != school) {
        const error = new HttpError(
            'Vous ne pouvez pas vous créer de compte dans cette école !', 401)
        return next(error);
    };

    if (existingTrustedTeacher && 
        (existingTrustedTeacher.name != name || existingTrustedTeacher.firstname != firstname)) {
        const error = new HttpError(
            'Le nom et/ou le prénom introduit(s) semble(nt) incorrect(s)', 422);
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
            'Création du compte ratée, veuillez réessayer plus tard.', 500);
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
        process.env.TOKENKEY_USER,
        {expiresIn: '24h'}
    );
    }
    catch(err) {
        const error = new HttpError(
            'Création du compte ratée, veuillez réessayer plus tard.', 500);
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
            'Connexion ratée, veuillez réessayer', 500);
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
            'Vous ne pouvez pas vous connecter, veuillez vérifier vos identfiants et réessayer.', 500)
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'Identifiants invalides, connexion impossible', 401)
        return next(error);
    }

    if (existingTeacher.status != "Active") {
        const error = new HttpError(
           'Création du compte en attente. Vérifiez vos emails et vos spams !', 401)
        return next(error);
    };


    let token;
    try {
        if (existingTeacher.role == "Admin") {
            token = jwt.sign({userId: existingTeacher.id, email: existingTeacher.email},
                process.env.TOKENKEY_USER,
                {expiresIn: '24h'}
            ); 
        }
        else {
        token = jwt.sign({userId: existingTeacher.id, email: existingTeacher.email},
            process.env.TOKENKEY_USER,
            {expiresIn: '24h'}
    );
        }
    }
    catch(err) {
        const error = new HttpError(
            'Conexion ratée, veuillez réessayer plus tard.', 500);
        return next(error);
    }

    res.json({ 
        userId: existingTeacher.id,
        email: existingTeacher.email,
        token: token
     });
}

// Check if teacher is admin
const checkIfAdmin = async (req, res, next) => {
    const email = req.body.email;

    let teacher;
    try {
        teacher =  await Teacher.findOne({email: email})
    }
    catch(err) {
        const error = new HttpError(
            'Echec, veuillez réessayer', 500);
        return next(error);
    }

    if (!teacher) {
        const error = new HttpError(
            'Identifiants invalides, connexion impossible', 401)
        return next(error);
    };

    if (teacher.role == "Admin") {
        res.json(true);
    }
    else {
        res.json(false);
    }
}


// Get all teachers by school 
const getTeachers = async (req, res, next) => {
    const school = req.params.school;

    let teachers;
    try {
        teachers =  await Teacher.find({school: school}, '-password').where({status: "Active"})
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des professeurs, veuillez réessayer', 500);
        return next(error);
    }
    if (!teachers) {
        const error = new HttpError(
            'Impossible de trouver des professeurs pour l\'école spécifiée', 404);
        return next(error);
    }

    res.json({ users: teachers.map(teacher => teacher.toObject({ getters: true})) });
}

// Get teacher by id
const getTeacherById = async (req, res, next) => {
    const teacherId = req.params.tid;

    let teacher;
    try {
        teacher = await Teacher.findById(teacherId);
    }
    catch(err) {
        const error = new HttpError("L'utlisateur n'a pas pu être trouvé", 500);
        return next(error);
    }

    if(!teacher) {
        const error = new HttpError('Aucun utilisateur trouvé avec cet id', 404);
        return next(error);
    }

    res.json({
        user: teacher.toObject({getters: true})
    });
};


// Update Teacher
const updateTeacher = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { email, password, role, defaultclassyear} =  req.body;
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
    teacher.defaultclassyear = defaultclassyear;

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

// verify email and patch status to activeate the account
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

// Send new password email
const sendNewPasswordEmail = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next (
            new HttpError('Entrées non valides, vérifiez vos données', 422)
        );
    }

    const { email } =  req.body;

    let teacher;
    try {
        teacher = await Teacher.findOne({email: email});
    }
    catch (err) {
        const error = new HttpError(
            'Erreur, veillez réessayer', 500);
        return next(error);
    }

    if (!teacher) {
        const error = new HttpError(
            'Aucun compte existant avec cette adresse mail', 422);
        return next(error);
    }

    
    // confirmation code generation
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let confirmationCodeToken = '';
    for (let i = 0; i < 25; i++) {
        confirmationCodeToken += characters[Math.floor(Math.random() * characters.length )];
    }
    
    teacher.confirmationCode = confirmationCodeToken;

    try {
        await teacher.save();
    }
    catch(err) {
        const error = new HttpError('Erreur, veuillez réessayer', 500);
        return next(error);
    } 
   

    nodemailer2.sendLostedPasswordEmail(
        teacher.firstname,
        teacher.email,
        "teachers",
        teacher.confirmationCode,
    );


    res.json({teacher: teacher.toObject({getters: true})});

};

// New password confirmation
const newPasswordConfirmation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next (
            new HttpError('Entrées non valides, vérifiez vos données', 422)
        );
    }

    const confirmationCode = req.params.code;
    const { password } =  req.body;

    let teacher;
    try {
        teacher= await Teacher.findOne({confirmationCode: confirmationCode});
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du mot de passe impossible', 500);
        return next(error);
    }

    if (!teacher) {
        const error = new HttpError(
            'Cet URL a expiré !', 422);
        return next(error);
    }


    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du mot de passe impossible', 500);
        return next(error);
    }


    teacher.password = hashedPassword;

     // confirmation code generation
     const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
     let confirmationCodeToken = '';
     for (let i = 0; i < 25; i++) {
         confirmationCodeToken += characters[Math.floor(Math.random() * characters.length )];
     }
 
     teacher.confirmationCode = confirmationCodeToken;

    try {
        await teacher.save();
    }
    catch(err) {
        const error = new HttpError('Le nouveau mot de passe n\'a pas pu être mis à jour, veuillez réessayer', 500);
        return next(error);
    }

    res.json({teacher: teacher.toObject({getters: true})})
}

exports.signup = signup;
exports.login = login;
exports.checkIfAdmin = checkIfAdmin;
exports.getTeachers = getTeachers;
exports.getTeacherById = getTeacherById;
exports.updateTeacher = updateTeacher;
exports.deleteTeacher = deleteTeacher;
exports.verifyEmail = verifyEmail;
exports.sendNewPasswordEmail = sendNewPasswordEmail;
exports.newPasswordConfirmation = newPasswordConfirmation;