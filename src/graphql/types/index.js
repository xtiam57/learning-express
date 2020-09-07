const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    user(id: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
