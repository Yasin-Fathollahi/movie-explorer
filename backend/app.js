const express = require('express');
const path = require('path');
const root = require('./utils/utils');

const app = express();

app.use(express.static(path.join(root, 'public')));

app.listen(3000);
