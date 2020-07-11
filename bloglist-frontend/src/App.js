import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/loginService';
import AddBlog from './components/AddBlogForm';
import Notification from './components/Notification';
import Toggalable from './components/Toggalable';
import LoginForm from './components/LoginForm';
import './App.css';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [notification, setNotification] = useState('');

  const addBlogFormRef = useRef();

  useEffect(() => {
    getBlogs();
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'));
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

  const handleLogin = async (e, username, password) => {
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

  const handleAddBlog = async (body) => {
    const header = { headers: { Authorization: userToken } };
    await blogService.postBlog(body, header, setNotification);
    getBlogs();
    addBlogFormRef.current.toggleVisibility();
  };

  const increaseLike = async (blog) => {
    console.log(blog.id);
    const newBlog = { id: blog.id, likes: parseInt(blog.likes) + 1 };
    await blogService.increaseLike(newBlog);
    getBlogs();
  };

  const handleLogout = () => {
    setUserToken(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
  };

  const blogsDiv = () => (
    <>
      <p>
        {localStorage.getItem('username')} is logged in.{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Toggalable buttonLabel="Add a new blog" ref={addBlogFormRef}>
        <AddBlog ref={addBlogFormRef} handleAddBlog={handleAddBlog} />
      </Toggalable>

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-row">
          <Blog blog={blog} increaseLike={increaseLike} />
        </div>
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
      {userToken === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        blogsDiv()
      )}
    </div>
  );
};

export default App;
