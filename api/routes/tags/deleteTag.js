const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { slug } = req.params;

  const tags = await readJsonFile('tags.json');
  const articles = await readJsonFile('articles.json');
  const comments = await readJsonFile('comments.json');

  if (!tags[slug]) {
    return res.status(404).send('The tag was not found!');
  }

  const tagValue = tags[slug];
  delete tags[slug];

  articles.forEach(article => {
    if (article.tags.includes(slug)) {
      const tagIndex = article.tags.indexOf(slug);
      return article.tags.splice(tagIndex, 1);
    }
  });

  const newArticles = articles.filter(article => article.tags.length !== 0);
  const newArticlesIds = newArticles.map(article => article.id);
  const newComments = comments.filter(
    comment => newArticlesIds.indexOf(comment.articleId) !== -1
  );

  await saveJsonFile('tags.json', tags);
  await saveJsonFile('articles.json', newArticles);
  await saveJsonFile('comments.json', newComments);

  res.json({
    message: `You have successfully deleted the ${tagValue} from the tag collection. Also, ${tagValue} tag is deleted from all articles that contain it!`,
    important:
      'If the blog had articles who contained only the deleted tag, they are deleted too!',
    tags
  });
};
