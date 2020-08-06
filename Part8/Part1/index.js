const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
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
      if (!args.author) {
        return books;
      }
      let genre = args.genre;
      let booksInGenre = books.filter((book) => book.genres.includes(genre));
      return booksInGenre;
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({});
      return authors.map(async (tempAuthor) => {
        const books = await Book.find({ author: tempAuthor.id });
        console.log(books);
        tempAuthor.bookCount = books.length;
        console.log(tempAuthor);
        return tempAuthor;
      });
    },
  },

  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.author });
        console.log(author);
        if (author === undefined || author === null) {
          author = new Author({
            name: args.author,
            born: null,
          });
          const newAuthor = await author.save();
          author = newAuthor;
        }

        let newBook = new Book({ ...args, author: author });
        await newBook.save();
        return newBook;
      } catch (err) {
        console.log('Error saving new book');
        console.log(err.message);
      }
    },

    editAuthor: async (root, args) => {
      try {
        let author = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.born } },
          { new: true }
        );
        console.log(author);
        if (author === undefined || author === null) {
          return null;
        }
        return author;
      } catch (err) {
        console.log('Error editing author');
        console.log(err.message);
      }
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
