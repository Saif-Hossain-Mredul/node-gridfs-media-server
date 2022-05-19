const express = require('express');
const multer = require('multer');
const getFileController = require('../controllers/get-file.controller');

const uploadFileController = require('../controllers/upload-file.controller');

const storage = require('../db/gridfs-configurations.db');

const fileRoute = express.Router();
const uploader = multer({ storage });

fileRoute.post('/files/upload', uploader.single('file'), uploadFileController);

fileRoute.get('/files/:bucketName/:fileName', getFileController);

module.exports = fileRoute;
