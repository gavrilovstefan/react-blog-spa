const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const comments = await readJsonFile('comments.json');
  const articles = await readJsonFile('articles.json');
  const authors = await readJsonFile('authors.json');
  const comment = comments.find(comment => comment.id === id);
  const existingArticle = articles.find(
    article => article.id === comment.articleId
  );
  const existingAuthor = authors.find(author => author.id === comment.userId);

  if (!comment) {
    return res.status(404).send('The comment with given ID was not found!');
  } else if (!existingArticle) {
    return res.status(404).send('The articleId is not correct!');
  } else if (!existingAuthor) {
    return res.status(404).send('The userId is not correct!');
  }

  const { body } = req.body;

  const updatedComment = {
    id: comment.id,
    articleId: comment.articleId,
    userId: comment.userId,
    date: new Date(),
    body
  };

  if (!updatedComment.body || updatedComment.body.length < 50) {
    return res
      .status(400)
      .send('Comment body is required and must be at least 50 caracters!');
  }

  const updatedComments = comments.filter(comment => comment.id !== id);

  await saveJsonFile('comments.json', [...updatedComments, updatedComment]);

  res.json({
    message: 'You have successfully updated an existing comment body!',
    updatedArticle
  });
};
