const { GridFsStorage } = require('multer-gridfs-storage');

const mongodbURL = process.env.MONGODB_URL;

const storage = new GridFsStorage({
    url: mongodbURL,
    file: async (req, file) => {
        return {
            filename: 'file_' + Date.now(),
            bucketName: 'files',
        };
    },
});

module.exports = storage;
