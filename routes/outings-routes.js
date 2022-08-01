const express = require('express');
const { check } = require('express-validator');

const outingsControllers = require('../controllers/outings-controllers');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const fileUpload = require('../middleware/file-upload');

const router = express.Router();

router.get('/:school/target/:target', outingsControllers.getOutingByTarget);

router.get('/id/:oid', outingsControllers.getOutingById);

router.post('/',
fileUpload.single('file'),
[
    check('title').not().isEmpty(),
    check('start').not().isEmpty(),
    check('end').not().isEmpty(),
    check('school').not().isEmpty(),
    check('school').isIn(['grand-hallet', 'moxhe']),
    check('target').not().isEmpty(),
    check('target').isIn(['m0', 'm1', 'm2', 'm3', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6'])
], outingsControllers.createOuting);

router.patch('/:oid',
fileUpload.single('file'),
[
    check('title').not().isEmpty(),
    check('start').not().isEmpty(),
    check('end').not().isEmpty(),
]),

router.delete('/:oid', outingsControllers.deleteOuting);

module.exports = router;