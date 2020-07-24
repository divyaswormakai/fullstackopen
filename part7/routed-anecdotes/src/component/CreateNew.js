import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useField } from '../hooks/index';

const CreateNew = ({ addNew, setNotification }) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const history = useHistory();

  let timer = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    setNotification(`A new notification: ${content}, has been added`);
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setNotification('');
    }, 10000);

    history.push('/');
  };

  const ResetAll = () => {
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={ResetAll}>Reset</button>
    </div>
  );
};

export default CreateNew;
