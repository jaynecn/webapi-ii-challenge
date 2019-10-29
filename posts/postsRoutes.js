const express = require('express');
const db = require('../data/db');

const router = express.Router();

// GET requests

router.get('', (req, res) => {
  db.find(req.query)
  .then(data => {
    res.status(200).json(data);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: 'The posts information could not be retrieved.' })
  })
})

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
  .then(data => {
    console.log(data);
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({message: 'The post with the specific ID does not exist.'})
    } 
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: 'The post information could not be retrieved.'})
  })
})

router.get('/:id/comments', (req, res) => {
  db.findCommentById(req.params.id)
  .then(data => {
    console.log(data);
    if (data. length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({message: 'The post with the specified ID does not exist.'})
    } 
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: 'The comments information could not be retrieved.'})
  })
})


// POST requests

router.post('', (req, res) => {
  // console.log(req);
  db.insert(req.body)
  .then(data => {
    console.log(data);
    res.status(201).json(data);
  })
  .catch(error => {
    //log error to database
    console.log(error);
    res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    res.status(500).json({error: "There was an error while saving the post to the database" })
  })
})

// old version
// router.post('/', (req, res) => {
//   const title = req.body.title;
//   const contents = req.body.contents;
//   res.status(200).json({
//     post: `title: '${title}', contents: '${contents}'`
//   });
//   .catch(error => {
//     console.log(error);
//   })
// });

module.exports = router;