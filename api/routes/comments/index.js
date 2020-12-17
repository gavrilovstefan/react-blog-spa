const router = require('express').Router();

const comments = require('./comments');
const comment = require('./comment');
const createComment = require('./createComment');
const updateComment = require('./updateComment');
const deleteComment = require('./deleteComment');

router.get('/', comments);
router.get('/:id', comment);

router.post('/', createComment);
router.post('/:id', updateComment);

router.delete('/:id', deleteComment);

module.exports = router;
