'use strict';

const express = require('express');
const path = require('path');

const app = express();
const rootPath = path.normalize(__dirname);

app.use(express.static(`${rootPath}/dist`));

const port = 8080;

app.listen(port, (err) => console.log('Server running on http://127.0.0.1:8080'));