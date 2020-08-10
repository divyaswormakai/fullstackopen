import { gql } from '@apollo/client';
import { BOOK_DETAILS } from './fragments';

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
  {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`;
