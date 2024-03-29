const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

const nodemailer = require('../nodemailer/nodemailer.config');
const nodemailer2 = require('../nodemailer/nodemailer.config2');

const Student = require('../models/student');
const TrustedStudent = require('../models/trusted_student');


// Students Signup
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next (
            new HttpError('Entrées non valides, vérifiez vos données', 422)
        );
    }

    const { email, name, firstname, password, school } = req.body;

    let existingStudent
    try {
        existingStudent = await Student.findOne({email: email})
    }
    catch(err) {
        const error = new HttpError (
            'Création du compte ratée, veuillez réessayer.', 500);
        return next(error);
    }

    if (existingStudent && existingStudent.status == "Active") {
        const error = new HttpError(
            'Email déjà utilisé, veuillez réesser avec un autre email.', 422);
        return next(error);
    }

    if (existingStudent && existingStudent.status != "Active") {
        existingStudent.remove();
    }

    let existingTrustedStudent
    try {
        existingTrustedStudent = await TrustedStudent.findOne({email: email})
    }
    catch(err) {
        const error = new HttpError (
            'Création du compte ratée, veillez réessayer.', 500);
        return next(error);
    }

    if (!existingTrustedStudent) {
        const error = new HttpError(
            'Vous ne pouvez pas créer de compte avec cette adresse email !', 422);
        return next(error);
    }
    
    if (existingTrustedStudent.school != school) {
        const error = new HttpError(
            'Vous ne pouvez pas vous créer de compte dans cette école !', 401)
        return next(error);
    };

    if (existingTrustedStudent && 
        (existingTrustedStudent.name != name || existingTrustedStudent.firstname != firstname)) {
        const error = new HttpError(
            'Le nom et/ou le prénom introduit(s) semble(nt) incorrect(s)', 422);
        return next(error);
    }


    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch(err) {
        const error = new HttpError('Le compte n\'a pas pu être créé, veuillez réessayer plus tard.', 500);
        return next(error);
    }

    // email conformation 
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let emailConfirmationToken = '';
    for (let i = 0; i < 25; i++) {
        emailConfirmationToken += characters[Math.floor(Math.random() * characters.length )];
    }


    const createdStudent = new Student ({
        email, 
        name,
        firstname,
        password: hashedPassword,
        school, 
        classyear: existingTrustedStudent.classyear,
        confirmationCode: emailConfirmationToken
    });

    try {
        await createdStudent.save();
    }
    catch(err) {
        const error = new HttpError('Création du compte ratée, veuillez réessayer plus tard.', 500);
        return next(error);
    } 

    nodemailer.sendConfirmationEmail(
        createdStudent.firstname,
        createdStudent.email,
        "students",
        createdStudent.confirmationCode
    );

    let token;
    try {
    token = jwt.sign({userId: createdStudent.id, email: createdStudent.email},
        process.env.TOKENKEY_USER,
        {expiresIn: '24h'}
    );
    }
    catch(err) {
        const error = new HttpError('Création du compte ratée, veuillez réessayer plus tard.', 500);
        return next(error);
    }

    res.status(201).json({ 
        userId: createdStudent.id,
        email: createdStudent.email,
        token: token }
    );
};


// Students Login
const login = async (req, res, next) => {
    const { email, password, school } = req.body;

    let existingStudent;
    try {
        existingStudent = await Student.findOne({email: email})
    }
    catch (err) {
        const error = new HttpError(
            'Connexion ratée, veuillez réessayer', 500);
        return next(error);
    }

    if (!existingStudent) {
        const error = new HttpError(
            'Identifiants invalides, connexion impossible', 401)
        return next(error);
    };

    if (existingStudent.school != school) {
        const error = new HttpError(
            'Identifiants invalides, connexion impossible', 401)
        return next(error);
    };

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingStudent.password);
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

    if (existingStudent.status != "Active") {
        const error = new HttpError(
           'Création du compte en attente. Vérifiez vos emails et vos spams !', 401)
        return next(error);
    };

    let token;
    try {
    token = jwt.sign({userId: existingStudent.id, email: existingStudent.email},
        process.env.TOKENKEY_USER,
        {expiresIn: '24h'}
    );
    }
    catch(err) {
        const error = new HttpError(
            'Connexion ratée, veillez réessayer plus tard.', 500);
        return next(error);
    }

    
    res.json({ 
        userId: existingStudent.id,
        email: existingStudent.email,
        token: token
     });
}


// Get all students by school 
const getStudents = async (req, res, next) => {
    const school = req.params.school;

    let students;
    try {
        students =  await Student.find({school: school}, '-password').where({status: "Active"})
    }
    catch(err) {
        const error = new HttpError(
            'Echec de la récupération des élèves, veillez réessayer', 500);
        return next(error);
    }
    if (!students) {
        const error = new HttpError(
            'Impossible de trouver des élèves pour l\'école spécifiée', 404);
        return next(error);
    }
    
    res.json({ users: students.map(student => student.toObject({ getters: true})) });
}

// Get student by id
const getStudentById = async (req, res, next) => {
    const studentId = req.params.sid;

    let student;
    try {
        student = await Student.findById(studentId);
    }
    catch(err) {
        const error = new HttpError("L'utlisateur n'a pas pu être trouvé", 500);
        return next(error);
    }

    if(!student) {
        const error = new HttpError('Aucun utilisateur trouvé avec cet id', 404);
        return next(error);
    }

    res.json({
        user: student.toObject({getters: true})
    });
};


// Update Student
const updateStudent = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError(
            'Entrées non valides, vérifiez vos données', 422);
        return next(error);
    }

    const { email, password, classyear, address, phonenumber, birdthdate } =  req.body;
    const studentId = req.params.sid;

    let student;
    try {
        student= await Student.findById(studentId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du compte impossible', 500);
        return next(error);
    }
    
    student.email = email;
    student.password = password;
    student.classyear = classyear;
    student.address = address;
    student.phonenumber = phonenumber;
    student.birdthdate = birdthdate

    try {
        await student.save();
    }
    catch(err){
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du compte impossible', 500);
        return next(error);
    }

    res.json({student: student.toObject({getters: true})})
}

// Delete Student
const deleteStudent = async (req, res, next) => {
    const studentId = req.params.sid;

    let student;
    try {
        student = await Student.findById(studentId);
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, suppression du compte impossible', 500);
        return next(error);
    }

    try {
        await student.remove();
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
 
    let student;
     try {
         student = await Student.findOne({confirmationCode: confirmationCode});
     }
     catch(err) {
         const error = new HttpError(
             'Quelque chose ne s\'est pas passé comme prévu', 500);
         return next(error);
     }
     if (!student) {
         const error = new HttpError(
             'utlisateur non trouvé !', 404);
         return next(error);
     }
 
     student.status = "Active";
 
     try {
         await student.save();
     }
     catch(err){
         const error = new HttpError(
             'Quelque chose ne s\'est pas passé comme prévu', 500);
         return next(error);
     }
 
     res.json({student: student.toObject({getters: true})})
 
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

    let student;
    try {
        student = await Student.findOne({email: email});
    }
    catch (err) {
        const error = new HttpError(
            'Erreur, veillez réessayer', 500);
        return next(error);
    }

    if (!student) {
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
    
    student.confirmationCode = confirmationCodeToken;

    try {
        await student.save();
    }
    catch(err) {
        const error = new HttpError('Erreur, veuillez réessayer', 500);
        return next(error);
    } 
   

    nodemailer2.sendLostedPasswordEmail(
        student.firstname,
        student.email,
        "students",
        student.confirmationCode,
    );


    res.json({student: student.toObject({getters: true})});

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

    let student;
    try {
        student= await Student.findOne({confirmationCode: confirmationCode});
    }
    catch(err) {
        const error = new HttpError(
            'Quelque chose ne s\'est pas passé comme prévu, mise à jour du mot de passe impossible', 500);
        return next(error);
    }

    if (!student) {
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


    student.password = hashedPassword;

    // confirmation code generation
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let confirmationCodeToken = '';
    for (let i = 0; i < 25; i++) {
        confirmationCodeToken += characters[Math.floor(Math.random() * characters.length )];
    }

    student.confirmationCode = confirmationCodeToken;

    try {
        await student.save();
    }
    catch(err) {
        const error = new HttpError('Le nouveau mot de passe n\'a pas pu être mis à jour, veuillez réessayer', 500);
        return next(error);
    }

    res.json({student: student.toObject({getters: true})})
}

exports.signup = signup;
exports.login = login;
exports.getStudents = getStudents;
exports.getStudentById = getStudentById;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.verifyEmail = verifyEmail;
exports.sendNewPasswordEmail = sendNewPasswordEmail;
exports.newPasswordConfirmation = newPasswordConfirmation;