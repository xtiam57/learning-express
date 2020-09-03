const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');

const models = require('../models');

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

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Book {
    id: ID!
    title: String!
    author: Author
  }

  # Using REST API
  type User {
    id: ID!
    name: String!
    email: String!
    isActive: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    hello: String
    book(id: ID!): Book
    books: [Book]
    author(id: ID!): Author
    authors: [Author]
    users: [User]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Author: {
    books: (author) => books.filter((book) => book.authorId === +author.id)
  },
  Book: {
    author: (book) => authors.find((author) => author.id === +book.authorId)
  },
  Query: {
    hello: () => 'Hello world!',
    book: (root, { id }) => books.find((book) => book.id === +id),
    books: () => books,
    author: (root, { id }) => authors.find((author) => author.id === +id),
    authors: () => authors,
    users: (_, {}, { models }) => {
      return models.User.find().select('-password');
      // return fetch('http://localhost:8000/api/users').then((res) => res.json())
    }
  }
};

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models },
  playground: true
});
