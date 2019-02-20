const express = require('express');
const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
  const body = req.body;
  res.status(200).json({
    answer: body
  });
});

module.exports = router;