const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.post('/', (req, res, next) => {
  const body = req.body;
  console.log(body);

  
  res.status(200).json({
    answer: body
  });
});

module.exports = router;