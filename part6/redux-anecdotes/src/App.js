import React from 'react';

import AddAnecdoteForm from './components/AddAnecdote';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AddAnecdoteForm />
    </div>
  );
};

export default App;
