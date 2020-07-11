import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/loginService';
import AddBlog from './components/AddBlogForm';
import Notification from './components/Notification';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setUserToken] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getBlogs();
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'));
      setUsername(localStorage.getItem('username'));
    }
  }, []);

  //to set the timer for notificaiton
  useEffect(() => {
    console.log(notification);
    setTimeout(() => setNotification(''), 2000);
  }, [notification]);

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
    const tokens = await loginService.login(body, setNotification);
    if (tokens !== null) {
      const tokenFull = `bearer ${tokens.token}`;
      setUserToken(tokenFull);
      localStorage.setItem('userToken', tokenFull);
      localStorage.setItem('username', tokens.username);
    }
  };

  const handleLogout = () => {
    setUserToken(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    setUsername('');
    setPassword('');
  };

  const loginForm = () => (
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
            type="password"
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
  );

  const blogsDiv = () => (
    <>
      <p>
        {username} is logged in. <button onClick={handleLogout}>Logout</button>
      </p>
      <AddBlog
        userToken={userToken}
        setNewBlogs={setBlogs}
        setNotification={setNotification}
      />
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );

  return (
    <div>
      <div>
        {notification.length > 0 ? (
          <Notification notification={notification} />
        ) : null}
      </div>
      {userToken === null ? loginForm() : blogsDiv()}
    </div>
  );
};

export default App;
