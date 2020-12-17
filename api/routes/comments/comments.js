const { readJsonFile } = require('../../utils');

module.exports = async (req, res) => {
  const comments = await readJsonFile('comments.json');

  res.json(comments);
};
