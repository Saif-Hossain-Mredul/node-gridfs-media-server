const express = require('express');
const multer = require('multer');
const getFileController = require('../controllers/get-file.controller');

const uploadFileController = require('../controllers/upload-file.controller');

const storage = require('../db/gridfs-configurations.db');

const fileRoute = express.Router();
const uploader = multer({ storage });

// URL: GET /upload
fileRoute.post('/upload', uploader.single('file'), uploadFileController);

// URL : GET /audios/4eWC6U5cQgjErZ4UKtCdzV
// URL : GET /videos/4eWC6U5cQgjErZ4UKtCdzV
// URL : GET /pdfs/4eWC6U5cQgjErZ4UKtCdzV
// URL : GET /files/4eWC6U5cQgjErZ4UKtCdzV
fileRoute.get('/:bucketName/:fileName', getFileController);

module.exports = fileRoute;
