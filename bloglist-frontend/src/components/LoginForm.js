import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginInFromReducer } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

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
          Username:
          <input
            type="text"
            value={username}
            name="username"
            className="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            className="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit" className="LoginSubmit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
