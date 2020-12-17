const uuid = require('uuid');

const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const authors = await readJsonFile('authors.json');
  const comments = await readJsonFile('comments.json');

  const { articleId, userId, body } = req.body;

  const existingArticle = articles.find(article => article.id === articleId);
  const existingAuthor = authors.find(author => author.id === userId);

  if (!articleId) {
    return res.status(400).send('The comment must have article ID!');
  } else if (!existingArticle) {
    return res.status(400).send('The comment must have a valid article ID!');
  }

  if (userId !== existingAuthor && userId !== '') {
    return res.status(400).json({
      message:
        "If you aren't an existing member leave the field empty, we'll make an unique Id for you."
    });
  }

  if (!body || body.length < 50) {
    return res
      .status(400)
      .send('Article body is required and must be at least 50 caracters!');
  }

  const newComment = {
    id: uuid.v4(),
    articleId,
    userId: existingAuthor || uuid.v4(),
    date: new Date(),
    body
  };

  await saveJsonFile('comments.json', [...comments, newComment]);

  res.json({
    message: 'You have successfully created new comment!',
    newComment
  });
};
