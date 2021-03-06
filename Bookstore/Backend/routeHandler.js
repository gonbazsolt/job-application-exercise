const express = require('express');
const app = express();
app.use(express.json());

const createNewBook = require('./routes/createNewBook');
const listAllBooks = require('./routes/listAllBooks');
const getOneBook = require('./routes/getOneBook');
const modifyBook = require('./routes/modifyBook');
const deleteBook = require('./routes/deleteBook');

const listAllTransactions = require('./routes/listAllTransactions');
const addTransaction = require('./routes/addTransaction');

app.use('/books/create', createNewBook);
app.use('/books/listall', listAllBooks);
app.use('/books/getonebook', getOneBook);
app.use('/books/modify', modifyBook);
app.use('/books/delete', deleteBook);

app.use('/transactions/listall', listAllTransactions);
app.use('/transactions/receive_or_sell', addTransaction);

module.exports = app;