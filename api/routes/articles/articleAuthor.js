const { readJsonFile } = require("../../utils.js");

module.exports = async (req, res) => {
  const { id } = req.params;

  const articles = await readJsonFile("articles.json");
  const authors = await readJsonFile("authors.json");
  const article = articles.find((article) => article.id === id);
  const author = authors.find((author) => author.id === article.authorId);
  
  res.json(author);
};
