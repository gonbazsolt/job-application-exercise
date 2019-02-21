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
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

router.put('/', (req, res, next) => {
  const book = new Book(req.body);
  
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
    book.id = parseInt(book.id);
    
    answer = {
      "success": book
    };
    
    //a mock adatbázis miatt, nem találtam egy lépésben egyszerű módosítást (SQL-ben egyszerűbb lenne)
    //mivel a kulcs egyedi és nem számít a sorrend
    //ezért egyszerűen törlöm a rekordot, majd felviszem az új adatokkal
    db.get('books').remove({ id: book.id }).write();
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