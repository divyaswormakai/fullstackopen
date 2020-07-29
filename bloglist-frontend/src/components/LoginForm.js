import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginInFromReducer } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';
import { Button, TextField } from '@material-ui/core';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (e, username, password) => {
    e.preventDefault();
    let body = {
      username: username,
      password: password,
    };
    await dispatch(LoginInFromReducer(body));
    await dispatch(setNotification('Log in successful', 5));
  };

  return (
    <div>
      <h2>Login Here</h2>
      <form onSubmit={(ev) => handleLogin(ev, username, password)}>
        <div>
          <TextField
            type="text"
            value={username}
            name="username"
            label="Username"
            variant="outlined"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            name="password"
            label="Password"
            variant="outlined"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button type="submit" className="LoginSubmit" variant="contained">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
