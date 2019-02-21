const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./../db.json');
const db = low(adapter);

router.use(express.json());
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  let answer = {};
  let statusCode = 200;
  let validBookRecordId = true;
  let findObject = { id: parseInt(id) }
  let book = db.get('books').find(findObject).value();

  if (book === undefined) {
    validBookRecordId = false;
  }

  if (validBookRecordId) {

    answer = {
      "success": book
    };

    db.get('books').remove({ id: book.id }).write();
  } else {
    statusCode = 500;
    answer = {
      "message": "Nem létező rekordot próbálsz törölni"
    };
  }

  res.status(statusCode).json(answer);
});

module.exports = router;