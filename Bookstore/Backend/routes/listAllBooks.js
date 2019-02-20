'use strict';

const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./../db.json');
const db = low(adapter);

router.get('/', (req, res) => {
  let body = db.getState().books;

  res.status(200).json({
    books: body
  });
});

module.exports = router;