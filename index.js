'use strict';

const express = require('express');
const path = require('path');

const app = express();
const rootPath = path.normalize(__dirname);

app.use(express.static(`${rootPath}/src`));

const port = 8080;
const adress = '0.0.0.0';

app.listen(port, adress, (err) => console.log('Client listening on 8080'));
