module.exports = uploadFile = async (req, res) => {
    try {
        res.status(201).send({
            filename: req.file.filename,
            contentType: req.file.contentType,
            size:
                parseFloat(parseFloat(req.file.size) / (1024 * 1024)).toFixed(
                    2
                ) + 'mb',
            uploadDate: req.file.uploadDate,
        });
    } catch (e) {
        console.log(e);
        res.send({
            error: true,
            message: 'Error while uploading.',
        });
    }
};
