import React from 'react';

import AddAnecdoteForm from './components/AddAnecdote';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AddAnecdoteForm />
    </div>
  );
};

export default App;
