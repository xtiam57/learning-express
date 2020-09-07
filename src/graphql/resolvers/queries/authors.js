const authors = [
  {
    id: 1,
    name: 'J.K. Rowling'
  },
  {
    id: 2,
    name: 'Michael Crichton'
  },
  {
    id: 3,
    name: 'Stephen King'
  }
];

module.exports = {
  author: (root, { id }) => authors.find((author) => author.id === +id),
  authors: () => authors
};
