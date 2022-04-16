const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

const Student = require('../models/student');

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return next (
            new HttpError('Entrées non valides, vérifiez vos données', 422)
        );
    }

    const { email, name, firstname, password, school, classyear } = req.body;

    let existingStudent
    try {
        existingStudent = await Student.findOne({email: email})
    }
    catch(err) {
        const error = new HttpError (
            'Création du compte ratée, veillez réessayer', 500);
        return next(error);
    }

    if (existingStudent) {
        const error = new HttpError(
            'Email déjà utilisé, veillez réesser avec un autre email', 422);
        return next(error);
    }

    const createdStudent = new Student ({
        email, 
        name,
        firstname,
        password,
        school, 
        classyear
    });

    await createdStudent.save();

    res.status(201).json({ student: createdStudent.toObject({ getters: true}) })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingStudent;
    try {
        existingStudent = await Student.findOne({email: email})
    }
    catch (err) {
        const error = new HttpError(
            'Connexion ratée, veillez réessayer', 500);
        return next(error);
    }

    if (!existingStudent || existingStudent.password != password) {
        const error = new HttpError(
            'Identifiants invalides, connexion impossible', 401)
        return next(error);
    };

    res.json({message: 'Vous êtes connecté'})
}

// Get all students by school 
const getStudents = async (req, res, next) => {
    const school = req.params.school;

    let students;
    try {
        students =  await Student.find({school: school}, '-password')
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

    res.json({ students: students.map(student => student.toObject({ getters: true})) });
}

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

exports.signup = signup;
exports.login = login;
exports.getStudents = getStudents;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;