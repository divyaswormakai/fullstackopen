import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const USER_DETAILS = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

export const FAVORITE_BOOKS = gql`
  query {
    favorites {
      title
      author {
        name
      }
      published
    }
  }
`;
