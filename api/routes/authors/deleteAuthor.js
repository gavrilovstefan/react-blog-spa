const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const authors = await readJsonFile('authors.json');
  const articles = await readJsonFile('articles.json');
  const comments = await readJsonFile('comments.json');
  const author = authors.find(author => author.id === id);

  if (!author) {
    return res.status(404).send('The author with given ID was not found!');
  }

  const authorIndex = authors.indexOf(author);
  authors.splice(authorIndex, 1);

  const removeAuthorArticles = articles.filter(
    article => article.authorId !== id
  );

  const removeAuthorComments = comments.filter(
    comment => comment.userId !== id
  );

  await saveJsonFile('authors.json', authors);
  await saveJsonFile('articles.json', removeAuthorArticles);
  await saveJsonFile('comments.json', removeAuthorComments);

  res.json({
    message:
      "You have successfully deleted an author, it's articles and it's comments!",
    author
  });
};
