import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries';
const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const genreResult = useQuery(ALL_GENRES);
  const [currGenre, setCurrGenre] = useState('All');

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }
  let books = result.data.allBooks;
  let genres = genreResult.data.allGenres;
  // genres.push('All');
  // console.log('Getting the book from genres');
  if (currGenre === 'All') {
    // console.log('This is al selected');
  } else {
    const filteredBooks = books.filter((book) =>
      book.genres.includes(currGenre)
    );
    // console.log(filteredBooks);
    books = filteredBooks;
  }

  const GetGenres = () => {
    return (
      <>
        <button onClick={() => setCurrGenre('All')}>All</button>
        {genres.map((genre) => (
          <button onClick={() => setCurrGenre(genre)} key={genre}>
            {genre}
          </button>
        ))}
      </>
    );
  };

  return (
    <div>
      <h2>books</h2>

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

      {GetGenres()}
    </div>
  );
};

export default Books;
