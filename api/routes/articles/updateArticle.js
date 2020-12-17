const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const articles = await readJsonFile('articles.json');
  const tagList = await readJsonFile('tags.json');
  const article = articles.find(article => article.id === id);

  if (!article) {
    return res.status(404).send('The article with given ID was not found!');
  }

  const { title, summary, body, tags } = req.body;

  if (req.body.id || req.body.authorId || req.body.date) {
    return res
      .status(404)
      .send(
        'You cannot change article ID, article author ID or write date manually!'
      );
  }

  const updatedArticle = {
    id: article.id,
    authorId: article.authorId,
    title: title || article.title,
    date: new Date(),
    summary: summary || article.summary,
    body: body || article.body,
    tags: tags || article.tags
  };

  if (!updatedArticle.title || updatedArticle.title.length < 3) {
    return res
      .status(400)
      .send('Article title is required and must be at least 3 caracters!');
  }

  if (!updatedArticle.summary || updatedArticle.summary.length < 20) {
    return res
      .status(400)
      .send('Article summary is required and must be at least 20 caracters!');
  }

  if (!updatedArticle.body || updatedArticle.body.length < 50) {
    return res
      .status(400)
      .send('Article body is required and must be at least 50 caracters!');
  }

  if (!updatedArticle.tags || updatedArticle.tags.length < 1) {
    return res.status(400).send('The article must have at least one tag!');
  }

  const tagValues = Object.values(tagList);
  const articleTags = [...tags];
  const newTags = articleTags.filter(tag => !tagValues.includes(tag));

  newTags.length > 0
    ? newTags.forEach(newTagValue => {
        const newTagKey = newTagValue.toLowerCase().split(' ').join('-');
        return (tagList[newTagKey] = newTagValue);
      })
    : null;

  const updatedArticles = articles.filter(article => article.id !== id);

  await saveJsonFile('articles.json', [...updatedArticles, updatedArticle]);
  await saveJsonFile('tags.json', tagList);

  res.json({
    message: 'You have successfully updated an existing article details!',
    updatedArticle
  });
};
