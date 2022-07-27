const express = require('express');
const { check } = require('express-validator');

const documentControllers = require('../controllers/documents-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const router = express.Router();

module.exports = router;