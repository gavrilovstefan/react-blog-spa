const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { tag: newTagValue } = req.body;

  const tags = await readJsonFile('tags.json');
  const tagsValues = Object.values(tags);
  const newTagKey = newTagValue.toLowerCase().split(' ').join('-');
  const newTagObj = (tags[newTagKey] = newTagValue);

  !newTagValue
    ? res.status(400).send('You must enter a tag name!')
    : tagsValues.includes(newTagValue) === true
    ? res.status(400).send('This tag name already exists!')
    : newTagObj;

  await saveJsonFile('tags.json', tags);

  res.json(tags);
};
