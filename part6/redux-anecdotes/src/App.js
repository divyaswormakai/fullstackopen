import React, { useEffect } from 'react';

import AddAnecdoteForm from './components/AddAnecdote';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';

import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import anecdoteService from './services/anecdoteService';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(initializeAnecdotes(anecdotes));
    });
  }, [dispatch]);
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
