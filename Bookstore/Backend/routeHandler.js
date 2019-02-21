const express = require('express');
const app = express();
app.use(express.json());

const createNewBook = require('./routes/createNewBook');
const listAllBooks = require('./routes/listAllBooks');
const getOneBook = require('./routes/getOneBook');
const modifyBook = require('./routes/modifyBook');

app.use('/books/create', createNewBook);
app.use('/books/listall', listAllBooks);
app.use('/books/getonebook', getOneBook);
app.use('/books/modify', modifyBook);

module.exports = app;