const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { v1: uuid } = require('uuid');
const { MONGODB_URI } = require('./url');
const Author = require('./model/Author.model');
const Book = require('./model/Book.model');

mongoose.set('useFindAndModify', false);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err.message);
  });

const typeDefs = gql`
  type bookCount {
    bookCount: Int!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, born: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return books;
      }
      let genre = args.genre;
      let booksInGenre = books.filter((book) => book.genres.includes(genre));
      return booksInGenre;
    },
    allAuthors: (root, args) => {
      return authors.map((author) => {
        let count = books.filter((book) => book.author === author.name).length;
        return { name: author.name, bookCount: count, born: author.born };
      });
    },
  },

  Mutation: {
    addBook: (root, args) => {
      let author = authors.find((author) => author.name === args.author);
      if (author === undefined) {
        author = {
          name: args.author,
          id: uuid(),
          born: null,
        };
        authors = authors.concat(author);
      }

      let newBook = { ...args, id: uuid(), author: author.name };
      books = books.concat(newBook);
      return newBook;
    },

    editAuthor: (root, args) => {
      let author = authors.find((author) => author.name === args.name);
      if (author === undefined) {
        return null;
      }

      author.born = args.born;
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
