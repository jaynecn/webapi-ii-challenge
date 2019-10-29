const express = require('express');

const router = express.Router();


// GET requests


// POST requests
router.post('/', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;
  res.status(200).json({
    post: `title: '${title}', contents: '${contents}'`
  });
});

module.exports = router;