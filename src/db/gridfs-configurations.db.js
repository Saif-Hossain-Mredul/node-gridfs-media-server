const { GridFsStorage } = require('multer-gridfs-storage');
const short = require('short-uuid');

const mongodbURL = process.env.MONGODB_URL;

const storage = new GridFsStorage({
    url: mongodbURL,
    file: async (req, file) => {
        if (file.mimetype.includes('video')) {
            return {
                filename: short.generate(),
                bucketName: 'videos',
            };
        } else if (file.mimetype.includes('audio')) {
            return {
                filename: short.generate(),
                bucketName: 'audios',
            };
        } else if (file.mimetype.includes('pdf')) {
            return {
                filename: short.generate(),
                bucketName: 'pdfs',
            };
        } else {
            return {
                filename: short.generate(),
                bucketName: 'files',
            };
        }
    },
});

module.exports = storage;
