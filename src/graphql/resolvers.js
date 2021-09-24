import { dateScalar } from "./scalars";
import { books as dbBooks } from "../data/books";
import { authors as dbAuthors } from "../data/authors";
import { reviews as dbReviews } from "../data/reviews";

let secuenceBookId = 4;
let secuenceAuthorId = 3;
let secuenceReviewId = 4;
let books = dbBooks;
let authors = dbAuthors;
let reviews = dbReviews;

export const resolvers = {
  Date: dateScalar,
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
    reviewsByBook(_, { bookId }) {
      return reviews.filter((review) => review.book === bookId);
    },
  },
  Mutation: {
    createAuthor(_, { input }) {
      if (
        authors.some((author) =>
          author.name.toUpperCase().includes(input.name.toUpperCase())
        )
      ) {
        throw new Error("Autor ya existe");
      }

      const author = {
        id: (++secuenceAuthorId).toString(),
        ...input,
      };
      authors.push(author);

      return author;
    },
    updateAuthor(_, { id, input }) {
      const index = authors.findIndex((author) => author.id === id);
      if (index == -1) {
        throw new Error("No se encontro el autor");
      }

      const author = {
        ...authors[index],
        ...input,
      };
      authors.splice(index, 1, author);

      return author;
    },
    deleteAuthor(_, { id }) {
      const author = authors.find((author) => author.id === id);
      if (!author) {
        throw new Error("No se encontro el autor");
      }

      books = books.filter((book) => book.author !== id);
      authors = authors.filter((author) => author.id !== id);

      return author;
    },
    createBook(_, { input }) {
      if (
        books.some((book) =>
          book.title.toUpperCase().includes(input.title.toUpperCase())
        )
      ) {
        throw new Error("Libro ya existe");
      }

      if (!authors.some((author) => author.id === input.authorId)) {
        throw new Error("Autor no existe");
      }

      const authorId = input.authorId;
      delete input["authorId"];

      const book = {
        id: (++secuenceBookId).toString(),
        author: authorId,
        ...input,
      };
      books.push(book);

      return book;
    },
    updateBook(_, { id, input }) {
      const index = books.findIndex((book) => book.id === id);
      if (index == -1) {
        throw new Error("No se encontro el libro");
      }

      if (!authors.some((author) => author.id === input.authorId)) {
        throw new Error("Autor no existe");
      }

      const authorId = input.authorId;
      delete input["authorId"];

      const book = {
        ...books[index],
        author: authorId,
        ...input,
      };
      books.splice(index, 1, book);

      return book;
    },
    deleteBook(_, { id }) {
      const book = books.find((book) => book.id === id);
      if (!book) {
        throw new Error("No se encontro el libro");
      }

      reviews = reviews.filter((review) => review.book !== id);
      books = books.filter((book) => book.id !== id);

      return book;
    },
    createReview(_, { input }) {
      if (!books.some((book) => book.id === input.bookId)) {
        throw new Error("Libro no existe");
      }

      const bookId = input.bookId;
      delete input["bookId"];

      const review = {
        id: (++secuenceReviewId).toString(),
        date: new Date(),
        book: bookId,
        ...input,
      };
      reviews.push(review);

      return review;
    },
    updateReview(_, { id, input }) {
      const index = reviews.findIndex((review) => review.id === id);
      if (index == -1) {
        throw new Error("No se encontro la visualización");
      }

      if (!books.some((book) => book.id === input.bookId)) {
        throw new Error("Libro no existe");
      }

      const bookId = input.bookId;
      delete input["bookId"];

      const review = {
        ...reviews[index],
        date: new Date(),
        book: bookId,
        ...input,
      };
      reviews.splice(index, 1, review);

      return review;
    },
  },
  Book: {
    author({ author }) {
      return authors.find((a) => a.id == author);
    },
    reviews({ id }) {
      return reviews.filter((review) => review.book == id);
    },
  },
  Author: {
    books({ id }) {
      return books.filter((book) => book.author == id);
    },
  },
};
