const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { slug } = req.params;
  const { tag: newTagValue } = req.body;

  const articles = await readJsonFile('articles.json');
  const tags = await readJsonFile('tags.json');
  const tagsValues = Object.values(tags);
  const newTagKey = newTagValue.toLowerCase().split(' ').join('-');

  if (!tags[slug]) {
    return res.status(404).send('The tag was not found!');
  }

  !newTagValue
    ? res.status(400).send('You must enter a tag name!')
    : tagsValues.includes(newTagValue) === true
    ? res.status(400).send('This tag name already exists!')
    : (tags[newTagKey] = newTagValue) && delete tags[slug];

  articles.filter(article => {
    if (article.tags.includes(slug)) {
      const tagIndex = article.tags.indexOf(slug);
      return article.tags.splice(tagIndex, 1, newTagValue);
    }
  });

  await saveJsonFile('tags.json', tags);
  await saveJsonFile('articles.json', articles);

  res.json({
    message: 'You have successfully updated an existing tag name!',
    tags
  });
};
