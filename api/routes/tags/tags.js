//  const tags = require('../../data/tags.json');

const { readJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const tags = await readJsonFile('tags.json');

  res.json(tags);
};
