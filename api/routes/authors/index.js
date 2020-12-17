const express = require('express');
const router = express.Router();

const authors = require('./authors.js');
const author = require('./author.js');
const authorArticles = require('./authorArticles.js');
const createAuthor = require('./createAuthor.js');
const updateAuthor = require('./updateAuthor.js');
const deleteAuthor = require('./deleteAuthor.js');

router.get('/', authors);
router.get('/:id', author);
router.get('/:id/articles', authorArticles);

router.post('/', createAuthor);
router.post('/:id', updateAuthor);

router.delete('/:id', deleteAuthor);

module.exports = router;
