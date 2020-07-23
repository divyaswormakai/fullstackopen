import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AddAnecdoteForm = (props) => {
  const addNew = async (event) => {
    event.preventDefault();
    const newInp = event.target.anecdoteInp.value;
    event.target.anecdoteInp.value = '';
    props.addAnecdote(newInp);
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

export default connect(null, { addAnecdote })(AddAnecdoteForm);
