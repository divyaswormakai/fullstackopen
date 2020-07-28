import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Notification from './components/Notification';
import UserInfo from './components/UserInfo';
import Users from './pages/Users';

const App = () => {
  return (
    <Router>
      <div>{/* Maybe a navbar or something like that */}</div>
      <div>
        <Notification />
        <UserInfo />
      </div>
      <Switch>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
