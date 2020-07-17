import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote, addAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  //sort the anecdotes
  anecdotes.sort((a, b) => {
    return a.votes > b.votes ? -1 : 1;
  });

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    console.log('vote', id);
  };

  const addNew = (event) => {
    event.preventDefault();
    const newInp = event.target.anecdoteInp.value;
    event.target.anecdoteInp.value = '';
    dispatch(addAnecdote(newInp));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="anecdoteInp" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
