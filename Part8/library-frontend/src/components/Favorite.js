import React from 'react';
import { useQuery } from '@apollo/client';
import { FAVORITE_BOOKS, USER_DETAILS } from '../queries';

const Favorites = ({ show }) => {
  const result = useQuery(FAVORITE_BOOKS);
  const userResult = useQuery(USER_DETAILS);
  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>Loading...</div>;
  }
  const books = result.data.favorites;

  return (
    <div>
      <h2>recommended books</h2>
      <p>
        Your favorite genre is: <em>{userResult.data.me.favoriteGenre}</em>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Favorites;
