const { readJsonFile, changeDate, pagination } = require("../../utils.js");

module.exports = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const tag = req.query.tag;

  const allArticles = await readJsonFile("articles.json");
  const authors = await readJsonFile("authors.json");
  const comments = await readJsonFile("comments.json");
  let articles

  tag && tag !== "alltags"
    ? (articles = allArticles.filter((article) => article.tags.includes(tag)))
    : (articles = allArticles);

  const result = pagination(articles, page, limit)

  result.tag= tag ? tag : "alltags"

  result.arr.forEach(
    (article) => (
      (article.author = authors.find(
        (author) => author.id === article.authorId
      )),
      (article.commentsCount = comments.filter(
        (comment) => comment.articleId === article.id
      ).length),
      (article.date = changeDate(article.date))
    )
  );

  res.json(result);
};
