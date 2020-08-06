import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_BORN } from '../mutations';
import { ALL_AUTHORS } from '../queries';

import Select from 'react-select';

const AuthorBirthYear = () => {
  const [authorName, setAuthorName] = useState('');
  const [born, setBorn] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [updateBook] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  const result = useQuery(ALL_AUTHORS);

  const selectOptions = result.data.allAuthors.map((author) => {
    return { value: author.name, label: author.name };
  });

  const handleSelectChange = (selectedOption) => {
    setSelectedAuthor(selectedOption);
    console.log(selectedOption);
  };

  const ChangeBornAuthorSubmit = (e) => {
    e.preventDefault();
    console.log(authorName, born);
    if (selectedAuthor !== null) {
      updateBook({
        variables: { name: selectedAuthor.value, born: parseInt(born) },
      });

      setAuthorName('');
      setBorn('');
    }
  };

  return (
    <div>
      <h1>Set BirthYear</h1>
      <form onSubmit={ChangeBornAuthorSubmit}>
        <div>
          Name:
          <Select
            value={selectedAuthor}
            options={selectOptions}
            onChange={handleSelectChange}
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
