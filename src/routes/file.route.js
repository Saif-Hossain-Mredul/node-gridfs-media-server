const express = require('express');
const multer = require('multer');

const storage = require('../db/gridfs-configurations.db');

const fileRoute = express.Router();

const uploader = multer({ storage });

fileRoute.post('/upload', uploader.single('file'), async (req, res) => {
    // console.log(req.file);

    res.send('nice');
});

module.exports = fileRoute;
