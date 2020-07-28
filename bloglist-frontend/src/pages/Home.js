import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddBlog from '../components/AddBlogForm';
import Toggalable from '../components/Toggalable';
import BlogList from '../components/BlogList';

import { initializeBlogs } from '../reducers/blogReducer';
import '../App.css';

const Home = () => {
  const addBlogFormRef = useRef();

  const userInfo = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleAddBlog = async () => {
    addBlogFormRef.current.toggleVisibility();
  };

  const blogsDiv = () => (
    <>
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
      {userInfo.token === undefined || userInfo.token === null
        ? null
        : blogsDiv()}
    </div>
  );
};

export default Home;
