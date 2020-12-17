
const { readJsonFile, pagination } = require('../../utils.js');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');
  const articles = await readJsonFile('articles.json');

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;

  const result = pagination(authors, page, limit)

  for (let i = 0; i < result.arr.length; i++) {
    result.arr[i].articlesCount = articles.filter((obj) => obj.authorId === result.arr[i].id).length;
  }
  res.json(result);
};
