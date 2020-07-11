import React, { useState } from 'react';
import PropTypes from 'prop-types';
const Blog = ({ blog, increaseLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const handleToggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} &nbsp;
        <button onClick={handleToggle}>Show Details</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} &nbsp;
        <button onClick={handleToggle}>Hide Details</button>
        <p>{blog.author}</p>
        <div>
          Likes: {blog.likes}&nbsp;&nbsp;
          <button onClick={() => increaseLike(blog)}>Like</button>
        </div>
        <p>{blog.url}</p>
        <button onClick={() => deleteBlog(blog)}>Delete</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};
export default Blog;
