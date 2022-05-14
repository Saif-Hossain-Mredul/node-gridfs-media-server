const express = require('express');
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const uploadFileController = require('../controllers/upload-file.controller');

const storage = require('../db/gridfs-configurations.db');

const fileRoute = express.Router();

const uploader = multer({ storage });

fileRoute.post('/files/upload', uploader.single('file'), uploadFileController);

fileRoute.get('/files/:fileName', async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const { db, client } = await storage.ready();

        const gfsBucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: 'files',
        });

        const cursor = await gfsBucket
            .find(
                {
                    filename: fileName,
                },
                { limit: 1 }
            )
            .toArray();

        const file = cursor[0];

        if (!file || file.length === 0) {
            throw new Error('No file exists');
        }

        if (
            file.contentType.includes('audio') ||
            file.contentType.includes('video')
        ) {
            // For Streaming
            const range = req.headers.range || '';
            const fileSize = file.length;
            const CHUNK_SIZE = 256000; // 256Kb
            const start = Number(range.replace(/\D/g, ''));
            const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
            const contentLength = end - start + 1;

            const headers = {
                'content-range': `bytes ${start}-${end}/${fileSize}`,
                'accept-ranges': 'bytes',
                'content-length': contentLength,
                'content-type': file.contentType,
            };

            res.writeHead(206, headers);

            gfsBucket
                .openDownloadStreamByName(file.filename, {
                    start,
                    end,
                })
                .pipe(res);
        } else {
            // Direct download
            gfsBucket.openDownloadStreamByName(file.filename).pipe(res);
        }
    } catch (e) {
        console.log(e);
        res.send({
            error: true,
            message: 'Error getting file.',
        });
    }
});

module.exports = fileRoute;
