const express = require('express');
const router = express.Router();

const tags = require('./tags.js');
const tagDetails = require('./tagDetails.js');
const tagArticles = require('./tagArticles.js');
const createTag = require('./createTag.js');
const updateTag = require('./updateTag.js');
const deleteTag = require('./deleteTag.js');

router.get('/', tags);
router.get('/:slug', tagDetails);
router.get('/:slug/articles', tagArticles);

router.post('/', createTag);
router.post('/:slug', updateTag);

router.delete('/:slug', deleteTag);

module.exports = router;
