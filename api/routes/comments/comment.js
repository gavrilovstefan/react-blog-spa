const { readJsonFile } = require('../../utils');

module.exports = async (req, res) => {
  const { id } = req.params;

  const comments = await readJsonFile('comments.json');
  const comment = comments.find(comment => comment.id === id);

  !comment
    ? res.status(404).send('The comment with given ID was not found.')
    : res.json(comment);
};
