const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./../db.json');
const db = low(adapter);

var Transaction = require('./../../models/JS/transaction');
var StockManager = require('./../stockManager');

router.use(express.json());
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/', (req, res, next) => {
  const transaction = new Transaction(req.body);
  const allTransactionsArray = db.get('transactions').sortBy('id').value();
  (allTransactionsArray.length === 0) ? transaction.id = 1 : transaction.id = allTransactionsArray[allTransactionsArray.length - 1].id + 1;
  
  let answer = {};
  let statusCode = 200;
  let validTransactionRecord = true;
  let problematicProperties = [];

  for (let property in transaction) {
    if (transaction[property] === '' || transaction[property] === null || transaction[property] === undefined) {
      validTransactionRecord = false;
      problematicProperties.push(property);
    }
  }

  if (validTransactionRecord) {
    const stockManager = new StockManager(db, transaction);

    if (stockManager.hasEnoughStock()) {
      stockManager.bookingStock(transaction.mov_type);

      answer = {
        "transactionSuccess": transaction,
        "newStock": stockManager.getCurrentStock()
      };
      db.get('transactions').push(transaction).write();
    } else {
      statusCode = 500;
      answer = {
        "message": "Az eladás nem lehetséges, mivel adott könyből nincs elég készleten!",
        "avaibleStock" : stockManager.getCurrentStock()
      }
    }
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