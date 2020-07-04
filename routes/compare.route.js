const express = require('express');
const router = express.Router();
const { normalizeText } = require('normalize-text');
router.post('/', (req, res) => {
  let {
    first,
    second
  } = req.body;
  try {
    first = normalizeText([req.body.first]);
    second = normalizeText([req.body.second]);
    console.log(first, second);
  } catch (e) {
    res.status(500);
    console.log(e);
  }
})

module.exports = router;