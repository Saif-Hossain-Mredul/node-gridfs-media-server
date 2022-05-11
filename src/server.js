const express = require('express');
require('./db/mongodb-connection.db');

const fileRoute = require('./routes/file.route')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(fileRoute)

app.listen(port, () => {
    console.log('Connected to port ' + port);
});
