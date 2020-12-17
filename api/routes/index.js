const express = require('express');
const router = express.Router();

const articles = require('./articles');
const authors = require('./authors');
const tags = require('./tags');
const comments = require('./comments');

router.use('/articles', articles);
router.use('/authors', authors);
router.use('/tags', tags);
router.use('/comments', comments);

router.get('/', (req, res) => {
  res.json({ message: 'Hello! Welcome to my RESTful API blog!' });
});

module.exports = router;
