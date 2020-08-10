import { gql } from '@apollo/client';
import { BOOK_DETAILS } from './fragments';

//could have been made better
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
