const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB_URI, JWT_SECRET } = require('./url');
const Author = require('./model/Author.model');
const Book = require('./model/Book.model');
const User = require('./model/User.model');

const jwt = require('jsonwebtoken');

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
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
    allBooks(author: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, born: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User

    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author) {
        return await Book.find({}).populate('author');
      }
      let author = args.author;
      let authorBooks = await Book.find({ author: author }).populate('author');
      console.log(authorBooks);
      return authorBooks;
    },
    allAuthors: async (root, args) => {
      try {
        const authors = await Author.find({});
        return authors.map(async (tempAuthor) => {
          const books = await Book.find({ author: tempAuthor.id });
          tempAuthor.bookCount = books.length;
          return tempAuthor;
        });
      } catch (err) {
        console.log('Error getting author details', err.message);
      }
    },
    me: async (root, args, context) => {
      console.log('ASDFASDF');
      return context.currentUser;
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
        throw new UserInputError(error.message, { invalidArgs: args });
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
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },

    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        const savedUser = await user.save();
        return savedUser;
      } catch (err) {
        console.log('Error creating new user');
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },

    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username });

        if (!user || args.password !== 'Password') {
          throw new UserInputError('Incorrect credentials');
        }
        const userToken = { username: user.username, id: user._id };
        return { value: jwt.sign(userToken, JWT_SECRET) };
      } catch (err) {
        console.log('Error logging in');
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
