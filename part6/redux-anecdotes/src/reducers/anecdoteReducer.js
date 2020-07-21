import anecdoteService from '../services/anecdoteService';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE_ANECDOTE': {
      const id = action.data.id;
      const toVoteAnecdote = state.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = {
        ...toVoteAnecdote,
        votes: toVoteAnecdote.votes + 1,
      };
      return state.map((state) => (state.id !== id ? state : updatedAnecdote));
    }
    case 'ADD_ANECDOTE': {
      return [...state, action.data];
    }
    case 'INITIALIZE_ANECDOTES': {
      return action.data;
    }
    default:
      return state;
  }
};

export const initializeAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes,
    });
  };
};

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: {
      id: id,
    },
  };
};

export const addAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = asObject(anecdote);
    await anecdoteService.createNew(newAnecdote);
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote,
    });
  };
};
export default anecdoteReducer;
