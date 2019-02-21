'use strict';

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
  next();
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  let findObject = { id: parseInt(id) };
  let body = db.get('books').find(findObject).value();

  res.status(200).json({
    book: body
  });
});

module.exports = router;