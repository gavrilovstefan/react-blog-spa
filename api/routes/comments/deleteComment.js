const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const comments = await readJsonFile('comments.json');
  const comment = comments.find(comment => comment.id === id);

  if (!comment) {
    return res.status(404).send('The comment with given ID was not found!');
  }

  const newComments = comments.filter(comments => comments.id !== id);

  await saveJsonFile('comments.json', newComments);

  res.json({
    message: 'You have successfully deleted a comment!',
    comment
  });
};
