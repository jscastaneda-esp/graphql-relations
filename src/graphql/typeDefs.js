export const typeDefs = `
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
    text: String!
    book: Book!
  }

  type Query  {
    ping: String!
    books: [Book!]!
    authors: [Author!]!
    reviews: [Review!]!
  }
`;
