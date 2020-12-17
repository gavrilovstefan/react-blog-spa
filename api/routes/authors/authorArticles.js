const { readJsonFile, changeDate, pagination } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const articles = await readJsonFile('articles.json');
  const authors = await readJsonFile('authors.json');
  const comments = await readJsonFile('comments.json');

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 3;

  const author = authors.find(author => author.id === id)

  const authorArticles = articles.filter(article => article.authorId === id);

  authorArticles.map(article => {
    article.commentsCount = comments.filter(comment => comment.articleId === article.id).length
    article.author = authors.find(author => author.id === article.authorId)
    article.date = changeDate(article.date)
  })

  const result = pagination(authorArticles, page, limit)

  !author
    ? res.status(404).send('The author with given ID was not found.')
    : authorArticles.length < 1
    ? res.status(404).send("This author doesn't have any articles.")
    : res.json(result);
};
