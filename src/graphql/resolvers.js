import { books } from "../data/books";
import { authors } from "../data/authors";
import { reviews } from "../data/reviews";

export const resolvers = {
  Query: {
    ping() {
      return "pong";
    },
    books() {
      return books;
    },
    authors() {
      return authors;
    },
    reviews() {
      return reviews;
    },
  },
  Book: {
    author({ author }) {
      return authors.find((a) => a.id == author);
    },
    reviews({ id }) {
      return reviews.filter((r) => r.book == id);
    },
  },
  Author: {
    books({ id }) {
      return books.filter((b) => b.author == id);
    },
  },
  Review: {
    book({ book }) {
      return books.find((b) => b.id == book);
    },
  },
};
