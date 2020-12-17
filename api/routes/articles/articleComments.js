//  const articles = require('../../data/articles.json');
//  const comments = require('../../data/comments.json');

const { readJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const articles = await readJsonFile('articles.json');
  const comments = await readJsonFile('comments.json');

  const article = articles.find(article => article.id === id);
  const articleComments = comments.filter(comment => comment.articleId === id);

  !article
    ? res.status(404).send('The article with given ID was not found.')
    : articleComments.length < 1
    ? res.status(404).send("The article doesn't have any comments.")
    : res.json(articleComments);
};
