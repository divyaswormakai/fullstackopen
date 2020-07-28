import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Blog from './Blog';

import { increaseLikeBlog, deleteBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const increaseLike = async (blog) => {
    await dispatch(increaseLikeBlog(blog));
    await dispatch(setNotification(`Liked: ${blog.title}.`, 5));
  };

  const deleteBlogFunc = async (blog) => {
    console.log(blog);
    const header = {
      headers: { Authorization: localStorage.getItem('userToken') },
    };

    if (
      window.confirm(
        `Do you really want to delete ${blog.title} by ${blog.author}?`
      )
    ) {
      await dispatch(deleteBlog(blog, header));
      await dispatch(setNotification(`Deleted: ${blog.title}.`, 5));
    }
  };

  return (
    <>
      {blogs.map((blog) => (
        <div key={'Blog' + blog.id} className="blog-row">
          <Blog
            blog={blog}
            increaseLike={increaseLike}
            deleteBlogFunc={deleteBlogFunc}
          />
        </div>
      ))}
    </>
  );
};

export default BlogList;
