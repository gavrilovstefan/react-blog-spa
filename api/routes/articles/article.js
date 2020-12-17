const { readJsonFile, changeDate, pagination } = require("../../utils.js");

module.exports = async (req, res) => {
  const { id } = req.params;

  const articles = await readJsonFile("articles.json");
  const authors = await readJsonFile("authors.json");
  const allComments = await readJsonFile("comments.json");

  const article = articles.find((article) => article.id === id);
  const author = authors.find((author) => author.id === article.authorId);

  article.date = changeDate(article.date)

  const comments = allComments.filter((comment) => comment.articleId === id)
  
  comments.map(
    (comment) => (
      comment.author = authors.find((author) => author.id === comment.userId,
      comment.date = changeDate(comment.date)
      ))
  );

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 3;

  const result = pagination(comments, page, limit)
  result.article = article
  result.author = author
  !article
    ? res.status(404).send("The article with given ID was not found.")
    : res.json(result);
};
