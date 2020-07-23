import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { SetNotification } from '../reducers/notificationReducer';

const selectAnecdotes = ({ anecdotes, filter }) => {
  let filteredAnecdotes = [];
  if (filter.length > 0) {
    filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.includes(filter)
    );
  } else {
    filteredAnecdotes = anecdotes;
  }
  //sort the anecdotes
  if (filteredAnecdotes.length > 0) {
    filteredAnecdotes.sort((a, b) => {
      return a.votes > b.votes ? -1 : 1;
    });
  }
  console.log('--fitlered anecdotes', filteredAnecdotes);
  return { anecdotes: filteredAnecdotes };
};

const AnecdoteList = (props) => {
  console.log(props);
  const vote = (anecdote) => {
    const id = anecdote.id;
    //voting the anecdote
    props.voteAnecdote(anecdote);
    console.log('vote', id);

    //set notification for anecdote
    const votedContent = props.anecdotes.find((anecdote) => anecdote.id === id)
      .content;
    const notifMsg = `You voted: ${votedContent}`;
    props.SetNotification(notifMsg, 5);
  };

  const temp = props.anecdotes ? (
    <>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  ) : null;

  return <>{temp}</>;
};

const mapStateToProps = (state) => {
  let anecdotes = state.anecdotes;
  let filter = state.filter;
  console.log(state);
  return selectAnecdotes({ anecdotes, filter });
};

const mapDispatchToProps = {
  voteAnecdote,
  SetNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;
