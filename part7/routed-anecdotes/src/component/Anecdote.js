import React from 'react';

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h3>
        {anecdote.content} by {anecdote.author}
      </h3>
      <p>
        has <em>{anecdote.votes}</em> votes.
      </p>
      <p>For more information visit: {anecdote.info}</p>
    </div>
  );
};

export default Anecdote;
