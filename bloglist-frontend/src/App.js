import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/loginService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submito');
    let body = {
      username: username,
      password: password,
    };
    const tokens = await loginService.login(body);
    console.log(tokens);
    setUserToken(tokens.token);
  };

  return (
    <div>
      {userToken === null ? (
        <>
          <h2>Login Here</h2>
          <form onSubmit={handleSubmit}>
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
                type="text"
                value={password}
                name="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
