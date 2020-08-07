import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { USER_LOGIN } from '../mutations';
const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(USER_LOGIN, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('userToken', token);
      setPage('authors');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!show) {
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    console.log();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <h1>User Login:</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
