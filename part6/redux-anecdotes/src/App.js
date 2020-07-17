import React from 'react';

import AddAnecdoteForm from './components/AddAnecdote';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AddAnecdoteForm />
    </div>
  );
};

export default App;
