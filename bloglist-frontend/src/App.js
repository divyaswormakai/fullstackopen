import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddBlog from './components/AddBlogForm';
import Notification from './components/Notification';
import Toggalable from './components/Toggalable';
import LoginForm from './components/LoginForm';

import { initializeBlogs } from './reducers/blogReducer';
import { LogOutFromReducer, InitializeUser } from './reducers/userReducer';
import './App.css';
import BlogList from './components/BlogList';

const App = () => {
  const addBlogFormRef = useRef();

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(InitializeUser());
    console.log('ASFASDF');
  }, [dispatch]);

  const handleAddBlog = async () => {
    addBlogFormRef.current.toggleVisibility();
  };

  const handleLogout = () => {
    dispatch(LogOutFromReducer());
  };

  const blogsDiv = () => (
    <>
      <p>
        {userInfo.username} is logged in.{' '}
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Toggalable buttonLabel="Add a new blog" ref={addBlogFormRef}>
        <AddBlog
          ref={addBlogFormRef}
          handleAddBlog={handleAddBlog}
          class="add-blog-btn"
        />
      </Toggalable>

      <h2>blogs</h2>
      <BlogList />
    </>
  );

  return (
    <div>
      <div>
        <Notification />
      </div>
      {userInfo.token === undefined ? <LoginForm /> : blogsDiv()}
    </div>
  );
};

export default App;
