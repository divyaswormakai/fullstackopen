import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

  filteredAnecdotes.sort((a, b) => {
    return a.votes > b.votes ? -1 : 1;
  });

  return filteredAnecdotes;
};
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => selectAnecdotes(state));
  const dispatch = useDispatch();

  const clearNotificationTimer = setTimeout(() => {
    dispatch(SetNotification('No new notification'));
  }, 5000);

  const vote = (id) => {
    //voting the anecdote
    dispatch(voteAnecdote(id));
    console.log('vote', id);
    //set notification for anecdote
    const votedContent = anecdotes.find((anecdote) => anecdote.id === id)
      .content;
    const notifMsg = `You voted: ${votedContent}`;
    dispatch(SetNotification(notifMsg));
    //clear previous timeout and set timer for 5 seconds
    clearInterval(clearNotificationTimer);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
