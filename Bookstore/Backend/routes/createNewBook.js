const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./../db.json');
const db = low(adapter);

var Book = require('./../../models/JS/book');

router.use(express.json());
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/', (req, res, next) => {
  const book = new Book(req.body);
  const allBooksArray = db.getState().books;
  (allBooksArray.length === 0) ? book.id = 1 : book.id = allBooksArray[allBooksArray.length - 1].id + 1;
  //ERROR HANDLING: ha nincs a db fájl, akkor a length-nél lehal, 500 Server Error megy vissza
  //azt sem vizsgálom, hogy a tábla létezik-e az adatbázisban, ezek az első refaktorálás feladai lehetnek
  
  let answer = {};
  let statusCode = 200;
  let validBookRecord = true;
  let problematicProperties = [];

  for (let property in book) {
    if ((book[property] === '' || book[property] === null || book[property] === undefined) && property !== 'description') {
      validBookRecord = false;
      problematicProperties.push(property);
    }
  }

  if (validBookRecord) {
    answer = {
      "success": book
    };
    db.get('books').push(book).write();
  } else {
    statusCode = 500;
    answer = {
      "message": "Legalább egy kötelező adatbázis mezőhöz tartozó érték nem lett átadva!",
      "notValidProperties": problematicProperties
    };
  }

  res.status(statusCode).json(answer);
});

module.exports = router;