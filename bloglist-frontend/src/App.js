import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Notification from './components/Notification';

import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Notification />
      </div>
      <Switch>
        <Route path="/user/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blog/:id">
          <Blog />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
