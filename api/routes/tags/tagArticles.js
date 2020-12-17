//  const articles = require('../../data/articles.json');

const { readJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { slug } = req.params;

  const articles = await readJsonFile('articles.json');
  const tags = await readJsonFile('tags.json');

  const slugArticles = articles.filter(article => article.tags.includes(slug));

  !tags[slug]
    ? res.status(404).send('The teg was not found.')
    : slugArticles.length < 1
    ? res.status(404).send("There aren't any articles under this tag.")
    : res.json(slugArticles);
};
