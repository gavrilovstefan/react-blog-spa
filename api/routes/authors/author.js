const { readJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const authors = await readJsonFile('authors.json');
  const author = authors.find(author => author.id === id);

  !author
    ? res.status(404).send('The author with given ID was not found.')
    : res.json(author);
};
