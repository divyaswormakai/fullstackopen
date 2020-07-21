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
  switch (action.type) {
    case 'VOTE_ANECDOTE': {
      const updatedAnecdote = action.data;
      // console.log(updatedAnecdote);
      return state.map((state) =>
        state.id !== updatedAnecdote.id ? state : updatedAnecdote
      );
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

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    await anecdoteService.updateAnecdote(updatedAnecdote);

    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote,
    });
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
