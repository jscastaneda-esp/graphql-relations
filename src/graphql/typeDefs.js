export const typeDefs = `
  scalar Date

  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    reviews: [Review!]
  }

  type Review {
    id: ID!
    date: Date!
    text: String!
  }

  type Query  {
    ping: String!
    authors: [Author!]!
    books: [Book!]!
    reviewsByBook(bookId: String!): [Review!]
  }

  input AuthorInput {
    name: String!
  }

  input BookInput {
    title: String!
    authorId: String!
  }

  input ReviewInput {
    text: String!
    bookId: String!
  }

  type Mutation {
    createAuthor(input: AuthorInput!): Author
    updateAuthor(id: ID!, input: AuthorInput!): Author
    deleteAuthor(id: ID!): Author
    createBook(input: BookInput!): Book
    updateBook(id: ID!, input: BookInput!): Book
    deleteBook(id: ID!): Book
    createReview(input: ReviewInput!): Review
    updateReview(id: ID!, input: ReviewInput!): Review
  }
`;
