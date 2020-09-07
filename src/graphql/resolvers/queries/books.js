const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    authorId: 1
  },
  {
    id: 2,
    title: 'Jurassic Park',
    authorId: 2
  },
  {
    id: 3,
    title: 'Harry Potter and the Final Movie',
    authorId: 1
  }
];

module.exports = {
  book: (root, { id }) => books.find((book) => book.id === +id),
  books: () => books
};
