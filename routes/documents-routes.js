const express = require('express');
const { check } = require('express-validator');

const documentsControllers = require('../controllers/documents-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/:school/target/:target', documentsControllers.getDocumentsByTarget);

router.get('/id/:did', documentsControllers.getDocumentsById);

router.post('/',
fileUpload.single('file'),
[
    check('title').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
    check('target').not().isEmpty(),
    check('target').isIn(['global', 'm0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'])
], documentsControllers.createDocument);

router.patch('/:did',
fileUpload.single('file'),
[
    check('title').not().isEmpty()
], documentsControllers.updateDocument);

router.delete('/:did', documentsControllers.deleteDocument);

module.exports = router;