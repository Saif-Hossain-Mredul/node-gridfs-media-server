const mongoose = require('mongoose');

const mongodbURL = process.env.MONGODB_URL;

const connection = mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}, () => console.log('Connected to db'));

module.exports = connection;
