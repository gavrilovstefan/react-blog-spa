const uuid = require('uuid');

const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const authors = await readJsonFile('authors.json');

  const { name, avatar, email, username, website, bio } = req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .send('Author Name is required and should be minimum 3 caracters');
  }

  if (!avatar) {
    return res.status(400).send('Author avatar is required');
  }

  if (!email || email.length < 6) {
    return res.status(400).send('Invalid Author email');
  }

  if (!website || website.length < 6) {
    return res.status(400).send('Invalid Author website');
  }

  if (!bio || bio.length < 20) {
    return res
      .status(400)
      .send('Author bio is required and should be minimum 20 caracters');
  }

  const newAuthor = {
    id: uuid.v4(),
    name,
    avatar,
    email,
    username,
    website,
    bio
  };

  await saveJsonFile('authors.json', [...authors, newAuthor]);

  res.json(newAuthor);
};
