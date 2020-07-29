import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Notification from './components/Notification';
import UserInfo from './components/UserInfo';

import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import Blog from './pages/Blog';

const App = () => {
  return (
    <Router>
      <div>{/* Maybe a navbar or something like that */}</div>
      <div>
        <Notification />
        <UserInfo />
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
