const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const {
    first,
    second
  } = req.body;
  console.log(req.body);
})

module.exports = router;