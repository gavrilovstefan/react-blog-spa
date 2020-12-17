//  const tags = require('../../data/tags.json');

const { readJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { slug } = req.params;

  const tags = await readJsonFile('tags.json');

  !tags[slug]
    ? res.status(404).send('The teg was not found.')
    : res.json(tags[slug]);
};
