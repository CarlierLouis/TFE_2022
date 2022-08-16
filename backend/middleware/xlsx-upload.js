const multer = require('multer');

const MIME_TYPE_MAP = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
};

const xlsxUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/xlsx');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, "trustedStudents." + ext);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mimetype!');
        cb(error, isValid);
    }
});

module.exports = xlsxUpload;