const uuid = require('uuid');

const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const articles = await readJsonFile('articles.json');
  const tagList = await readJsonFile('tags.json');

  const { authorId, title, summary, body, tags } = req.body;

  if (!authorId) {
    return res.status(400).send('The article must have author ID!');
  }

  if (!title || title.length < 3) {
    return res
      .status(400)
      .send('Article title is required and must be at least 3 caracters!');
  }

  if (!summary || summary.length < 20) {
    return res
      .status(400)
      .send('Article summary is required and must be at least 20 caracters!');
  }

  if (!body || body.length < 50) {
    return res
      .status(400)
      .send('Article body is required and must be at least 50 caracters!');
  }

  if (!tags || tags.length < 1) {
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

  const newArticle = {
    id: uuid.v4(),
    authorId,
    title,
    date: new Date(),
    summary,
    body,
    tags
  };

  await saveJsonFile('articles.json', [...articles, newArticle]);
  await saveJsonFile('tags.json', tagList);

  res.json({
    message: 'You have successfully created new article!',
    newArticle
  });
};
