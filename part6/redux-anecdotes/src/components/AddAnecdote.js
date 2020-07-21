import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdoteService';

const AddAnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNew = async (event) => {
    event.preventDefault();
    const newInp = event.target.anecdoteInp.value;
    event.target.anecdoteInp.value = '';
    let newData = await anecdoteService.createNew(newInp);
    dispatch(addAnecdote(newData));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div>
          <input name="anecdoteInp" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AddAnecdoteForm;
