import React, { useEffect } from 'react';

import AddAnecdoteForm from './components/AddAnecdote';
import ConnectedAnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <ConnectedAnecdoteList />
      <AddAnecdoteForm />
    </div>
  );
};

export default App;
