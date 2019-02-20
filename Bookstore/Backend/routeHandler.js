const express = require('express');
const app = express();
app.use(express.json());

const createNewBook = require('./routes/createNewBook');

app.use('/books/create/new', createNewBook);

module.exports = app;