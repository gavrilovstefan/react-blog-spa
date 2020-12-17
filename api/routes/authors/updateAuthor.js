const { readJsonFile, saveJsonFile } = require('../../utils.js');

module.exports = async (req, res) => {
  const { id } = req.params;

  const authors = await readJsonFile('authors.json');
  const author = authors.find(author => author.id === id);

  if (!author) {
    return res.status(404).send('The author with given ID was not found!');
  }

  const { name, avatar, email, username, website, bio } = req.body;

  if (req.body.id) {
    return res.status(404).send('You cannot change author ID!');
  }

  const updatedAuthor = {
    id: author.id,
    name: name || author.name,
    avatar: avatar || author.avatar,
    email: email || author.email,
    username: username || author.username,
    website: website || author.website,
    bio: bio || author.bio
  };

  if (!updatedAuthor.name || updatedAuthor.name.length < 3) {
    return res
      .status(400)
      .send('Author Name is required and must be minimum 3 caracters!');
  }

  if (!updatedAuthor.avatar) {
    return res.status(400).send('Author avatar is required!');
  }

  if (!updatedAuthor.email || updatedAuthor.email.length < 6) {
    return res.status(400).send('Invalid author email!');
  }

  if (!updatedAuthor.website || updatedAuthor.website.length < 6) {
    return res.status(400).send('Invalid author website!');
  }

  if (!updatedAuthor.bio || updatedAuthor.bio.length < 20) {
    return res
      .status(400)
      .send('Author bio is required and must be minimum 20 caracters');
  }

  const updatedAuthors = authors.filter(author => author.id !== id);

  await saveJsonFile('authors.json', [...updatedAuthors, updatedAuthor]);

  res.json({
    message: 'You have successfully updated an existing author information!',
    updatedAuthor
  });
};
