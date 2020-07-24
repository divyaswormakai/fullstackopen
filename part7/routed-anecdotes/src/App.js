import React, { useState, useEffect } from 'react';
import Footer from './component/Footer';
import AnecdoteList from './component/AnecdoteList';
import About from './component/About';
import CreateNew from './component/CreateNew';
import Anecdote from './component/Anecdote';
import Menu from './component/Menu';
import Notification from './component/Notification';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';

const App = () => {
  const [anecdotes, setAnecdotes] = useState(data);
  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const match = useRouteMatch('/anecdote/:id');
  const selectedAnecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id.toString())
    : null;

  const anecdoteById = (id) => {
    return anecdotes.find((a) => a.id === id);
  };

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>
        <Route path="/anecdote/:id">
          <Anecdote anecdote={selectedAnecdote} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

const data = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1',
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2',
  },
];

export default App;
