const express = require('express');
const router = express.Router();

const articles = require('./articles.js');
const article = require('./article.js');
const articleComments = require('./articleComments.js');
const articleAuthor = require('./articleAuthor.js');
const createArticle = require('./createArticle.js');
const updateArticle = require('./updateArticle.js');
const deleteArticle = require('./deleteArticle.js');

router.get('/', articles);
router.get('/:id', article);
router.get('/:id/comments', articleComments);
router.get('/:id/author', articleAuthor);

router.post('/', createArticle);
router.post('/:id', updateArticle);

router.delete('/:id', deleteArticle);

module.exports = router;
