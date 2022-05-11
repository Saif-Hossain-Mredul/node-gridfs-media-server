const { GridFsStorage } = require('multer-gridfs-storage');

const mongodbURL = process.env.MONGODB_URL;

const storage = new GridFsStorage({
    url: mongodbURL,
    file: async (req, file) => {
        console.log(req.file);

        if (file.mimetype.includes('audio')) {
            return {
                filename: 'file_' + Date.now(),
                bucketName: 'audios',
            };
        } else if(file.mimetype.includes('video')) {
            return {
                filename: 'file_' + Date.now(),
                bucketName: 'videos',
            }; 
        } else {
            return {
                filename: 'file_' + Date.now(),
                bucketName: 'files',
            };
        }
    },
});

module.exports = storage;
