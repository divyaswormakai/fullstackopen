import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation addingBookMutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
    }
  }
`;

export const UPDATE_BORN = gql`
  mutation updateBookMutation($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
    }
  }
`;
