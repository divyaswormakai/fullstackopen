import { createStore } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// const reducer = combineReducers({
//     notes: noteReducer,
//     filter: filterReducer
//   })

const reducer = anecdoteReducer;

const store = createStore(reducer, composeWithDevTools());

export default store;
