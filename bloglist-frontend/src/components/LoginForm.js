import React, { useState } from 'react';
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <button type="submit" name="LoginSubmit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
