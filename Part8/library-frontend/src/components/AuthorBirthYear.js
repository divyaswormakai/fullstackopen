import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_BORN } from '../mutations';
import { ALL_AUTHORS } from '../queries';

const AuthorBirthYear = () => {
  const [authorName, setAuthorName] = useState('');
  const [born, setBorn] = useState('');
  const [updateBook] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const ChangeBornAuthorSubmit = (e) => {
    e.preventDefault();
    console.log(authorName, born);
    updateBook({
      variables: { name: authorName.trim(), born: parseInt(born) },
    });

    setAuthorName('');
    setBorn('');
  };

  return (
    <div>
      <h1>Set BirthYear</h1>
      <form onSubmit={ChangeBornAuthorSubmit}>
        <div>
          Name:
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
          Born:
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default AuthorBirthYear;
