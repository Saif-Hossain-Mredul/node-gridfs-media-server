const express = require('express');
require('./db/mongodb-connection.db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log('Connected to port ' + port);
});
