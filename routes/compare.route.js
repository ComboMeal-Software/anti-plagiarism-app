const express = require('express');
const router = express.Router();
const leven = require('../functions/leven');
const shingle = require('../functions/shingling');

router.post('/leven', (req, res) => {
  let {
    first,
    second,
  } = req.body;
  try {
    const result = leven.getLeven(first, second);
    res.status(200).json({
      result,
    });
  } catch (e) {
    res.status(500);
    console.log(e);
  }
})
router.post('/shingling', (req, res) => {
  let {
    first,
    second,
  } = req.body;
  try {
    const result = shingle.getShingle(first, second);
    res.status(200).json({
      result,
    });
  } catch (e) {
    res.status(500);
    console.log(e);
  }
})

module.exports = router;