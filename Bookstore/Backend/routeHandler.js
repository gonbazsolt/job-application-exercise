const express = require('express');
const app = express();
app.use(express.json());

const createNewBook = require('./routes/createNewBook');
const listAllBooks = require('./routes/listAllBooks');

app.use('/books/create/new', createNewBook);
app.use('/books/listall', listAllBooks);

module.exports = app;