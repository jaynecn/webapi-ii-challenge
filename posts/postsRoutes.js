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

router.post('/:id/comments', (req, res) => {
  const comment = req.body
  // console.log(req);
  db.insertComment(req.body)
  .then(data => {
    console.log(data);
    res.status(201).json(comment);
    res.status(404).json({ message: 'The post with the specified ID does not exist.'})
  })
  .catch(error => {
    //log error to database
    console.log(error);
    res.status(400).json({errorMessage: "Please provide text for the comment."})
    res.status(500).json({error: "There was an error while saving the comment to the database" })
  })
})

// Delete requests
router.delete('/:id', (req, res) => {
  const body = req.body
  db.remove(req.params.id)
  .then(data => {
    console.log(data);
    res.status(200).json(body);
    res.status(404).json({ message: 'The post with the specified ID does not exist.'})
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: 'The post could not be removed'});
  })
})

// PUT request
router.put('/:id', (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
    .then(data => {
      console.log(data);
      if (data) {
        res.status(200).json(changes);
      }
      else {
        res.status(404).json({ message: 'The post with the specified ID does not exist'});
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post'});
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ errorMessage: 'Please provide title and contents for the post'});
      res.status(500).json({ error: 'The pos information could not be modified'})
    })
})

module.exports = router;