const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const articles = await readJsonFile('articles.json');
  const comments = await readJsonFile('comments.json');
  const article = articles.find(article => article.id === id);

  if (!article) {
    return res.status(404).send('The author with given ID was not found!');
  }

  const articleIndex = articles.indexOf(article);
  articles.splice(articleIndex, 1);

  const removeArticleComments = comments.filter(
    comments => comments.articleId !== id
  );

  await saveJsonFile('articles.json', articles);
  await saveJsonFile('comments.json', removeArticleComments);

  res.json({
    message: "You have successfully deleted an article and it's comments!",
    article
  });
};
